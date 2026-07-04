"use client"

import { useEffect, useState } from "react"
import { Download, Eye, EyeOff, LogOut } from "lucide-react"
import { toast } from "sonner"

interface Application {
  id: number
  fullName: string
  email: string
  phone: string
  university: string
  city: string
  fieldOfStudy: string
  yearOfStudy: string
  graduationYear: string
  aboutYou: string
  whyJoin: string
  leadershipExperience: string
  willingEvents: string
  justifyEvents: string
  hoursPerWeek: string
  futureLeadership: string
  interestArea: string
  studentIdUrl: string
  resumeUrl: string
  profilePhotoUrl: string
  tshirtSize: string
  tshirtColor: string
  status: string
  createdAt: string
}

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [adminKey, setAdminKey] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Check if admin key is stored
  useEffect(() => {
    const storedKey = localStorage.getItem("admin_key")
    if (storedKey) {
      setAdminKey(storedKey)
      setIsAuthenticated(true)
      fetchApplications(storedKey)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchApplications = async (key: string) => {
    try {
      const res = await fetch("/api/admin/applications", {
        headers: { "x-admin-key": key },
      })

      if (!res.ok) {
        throw new Error("Unauthorized")
      }

      const data = await res.json()
      setApplications(data)
    } catch (error) {
      toast.error("Failed to fetch applications")
      setIsAuthenticated(false)
      localStorage.removeItem("admin_key")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!adminKey.trim()) {
      toast.error("Please enter admin key")
      return
    }
    localStorage.setItem("admin_key", adminKey)
    setIsAuthenticated(true)
    setLoading(true)
    fetchApplications(adminKey)
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_key")
    setIsAuthenticated(false)
    setAdminKey("")
    setApplications([])
  }

  const exportToCSV = () => {
    if (applications.length === 0) {
      toast.error("No applications to export")
      return
    }

    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "University",
      "City",
      "Field of Study",
      "Year of Study",
      "Graduation Year",
      "About You",
      "Why Join",
      "Leadership Experience",
      "Willing Events",
      "Justify Events",
      "Hours Per Week",
      "Future Leadership",
      "Interest Area",
      "T-Shirt Size",
      "T-Shirt Color",
      "Status",
      "Created At",
    ]

    const rows = applications.map((app) => [
      app.id,
      app.fullName,
      app.email,
      app.phone,
      app.university,
      app.city,
      app.fieldOfStudy || "",
      app.yearOfStudy || "",
      app.graduationYear || "",
      (app.aboutYou || "").replace(/"/g, '""'),
      (app.whyJoin || "").replace(/"/g, '""'),
      (app.leadershipExperience || "").replace(/"/g, '""'),
      app.willingEvents || "",
      (app.justifyEvents || "").replace(/"/g, '""'),
      app.hoursPerWeek || "",
      app.futureLeadership || "",
      app.interestArea || "",
      app.tshirtSize || "",
      app.tshirtColor || "",
      app.status,
      app.createdAt,
    ])

    const csv =
      headers.map((h) => `"${h}"`).join(",") +
      "\n" +
      rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `applications_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("CSV downloaded successfully")
  }

  const exportToExcel = async () => {
    if (applications.length === 0) {
      toast.error("No applications to export")
      return
    }

    try {
      // Dynamically import xlsx to keep bundle size down
      const XLSX = await import("xlsx")

      const data = applications.map((app) => ({
        ID: app.id,
        "Full Name": app.fullName,
        Email: app.email,
        Phone: app.phone,
        University: app.university,
        City: app.city,
        "Field of Study": app.fieldOfStudy,
        "Year of Study": app.yearOfStudy,
        "Graduation Year": app.graduationYear,
        "About You": app.aboutYou,
        "Why Join": app.whyJoin,
        "Leadership Experience": app.leadershipExperience,
        "Willing Events": app.willingEvents,
        "Justify Events": app.justifyEvents,
        "Hours Per Week": app.hoursPerWeek,
        "Future Leadership": app.futureLeadership,
        "Interest Area": app.interestArea,
        "T-Shirt Size": app.tshirtSize,
        "T-Shirt Color": app.tshirtColor,
        Status: app.status,
        "Created At": app.createdAt,
      }))

      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Applications")
      XLSX.writeFile(wb, `applications_${new Date().toISOString().split("T")[0]}.xlsx`)
      toast.success("Excel file downloaded successfully")
    } catch (error) {
      toast.error("Failed to export Excel file")
      console.error(error)
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-12 px-4">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg bg-card border border-border p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground mb-6">Enter your admin key to access applications</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Admin Key</label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter admin key"
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Note: The default admin key is set via ADMIN_SECRET_KEY environment variable
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4 mx-auto"></div>
          <p className="text-muted-foreground">Loading applications...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage {applications.length} applications</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/40 text-foreground hover:bg-secondary/60 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            <Download size={18} />
            Export CSV
          </button>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium"
          >
            <Download size={18} />
            Export Excel
          </button>
        </div>

        {/* Applications Table */}
        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          {applications.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No applications yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary/40">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">University</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Submitted</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{app.fullName}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{app.email}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{app.university}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            app.status === "approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : app.status === "rejected"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => {
                            setSelectedApp(app)
                            setShowDetails(true)
                          }}
                          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                        >
                          <Eye size={18} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetails && selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-lg max-w-2xl w-full my-8 shadow-2xl border border-border">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">{selectedApp.fullName}</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Personal Info */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground">{selectedApp.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">City</p>
                    <p className="text-foreground">{selectedApp.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">University</p>
                    <p className="text-foreground">{selectedApp.university}</p>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Academic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Field of Study</p>
                    <p className="text-foreground">{selectedApp.fieldOfStudy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year of Study</p>
                    <p className="text-foreground">{selectedApp.yearOfStudy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Graduation Year</p>
                    <p className="text-foreground">{selectedApp.graduationYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hours Per Week</p>
                    <p className="text-foreground">{selectedApp.hoursPerWeek || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">About</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Why Join?</p>
                    <p className="text-foreground text-sm">{selectedApp.whyJoin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">About You</p>
                    <p className="text-foreground text-sm">{selectedApp.aboutYou || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Ambassador Fit */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Ambassador Fit</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Willing to Attend Events?</p>
                    <p className="text-foreground">{selectedApp.willingEvents}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">How to Represent & Create Impact</p>
                    <p className="text-foreground text-sm">{selectedApp.justifyEvents || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Files & Images */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Uploaded Files</h3>
                <div className="space-y-4">
                  {selectedApp.profilePhotoUrl && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Profile Photo</p>
                      <div className="flex gap-3 items-end">
                        <img
                          src={selectedApp.profilePhotoUrl}
                          alt="Profile"
                          className="w-32 h-32 object-cover rounded-lg border border-border bg-muted"
                        />
                        <a
                          href={selectedApp.profilePhotoUrl}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                          download={`${selectedApp.fullName}-profile.jpg`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download size={16} />
                          Download
                        </a>
                      </div>
                    </div>
                  )}
                  {selectedApp.studentIdUrl && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Student ID Card</p>
                      <a
                        href={selectedApp.studentIdUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium"
                        download={`${selectedApp.fullName}-studentid`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download size={16} />
                        Download
                      </a>
                    </div>
                  )}
                  {selectedApp.resumeUrl && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Resume / CV</p>
                      <a
                        href={selectedApp.resumeUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium"
                        download={`${selectedApp.fullName}-resume`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download size={16} />
                        Download
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">T-Shirt Size</p>
                    <p className="text-foreground">{selectedApp.tshirtSize || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">T-Shirt Color</p>
                    <p className="text-foreground">{selectedApp.tshirtColor || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-border bg-secondary/20">
              <button
                onClick={() => setShowDetails(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-secondary/40 text-foreground hover:bg-secondary/60 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
