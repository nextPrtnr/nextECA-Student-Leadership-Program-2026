import React from "react"

interface ConfirmationEmailProps {
  fullName: string
  email: string
  university: string
  facebook?: string
  city?: string
  submissionDate?: string
}

export const ConfirmationEmail: React.FC<ConfirmationEmailProps> = ({
  fullName,
  email,
  university,
  facebook,
  city,
  submissionDate,
}) => {
  const formattedDate = submissionDate
    ? new Date(submissionDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa", padding: "20px" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#ffffff",
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: "0 0 10px 0", fontSize: "28px", fontWeight: "bold" }}>
            Welcome to next ECA!
          </h1>
          <p style={{ margin: "0", fontSize: "16px", opacity: "0.9" }}>
            Your Ambassador Application Has Been Received
          </p>
        </div>

        {/* Main Content */}
        <div style={{ padding: "40px 30px" }}>
          <p style={{ fontSize: "16px", color: "#333", margin: "0 0 20px 0" }}>
            Hello <strong>{fullName}</strong>,
          </p>

          <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6", margin: "0 0 20px 0" }}>
            Thank you for your interest in becoming a next ECA Student Ambassador! We&apos;re excited to have received your application and deeply appreciate your passion for creating positive impact in our community.
          </p>

          {/* Application Details */}
          <div
            style={{
              backgroundColor: "#f0f4f8",
              border: "1px solid #dfe5ec",
              borderRadius: "6px",
              padding: "20px",
              margin: "20px 0",
            }}
          >
            <h3 style={{ margin: "0 0 15px 0", color: "#333", fontSize: "16px", fontWeight: "bold" }}>
              Your Application Details:
            </h3>
            <table style={{ width: "100%", fontSize: "14px" }}>
              <tbody>
                <tr style={{ borderBottom: "1px solid #dfe5ec" }}>
                  <td style={{ padding: "8px 0", color: "#666", fontWeight: "500" }}>Full Name:</td>
                  <td style={{ padding: "8px 0", color: "#333" }}>{fullName}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #dfe5ec" }}>
                  <td style={{ padding: "8px 0", color: "#666", fontWeight: "500" }}>Email:</td>
                  <td style={{ padding: "8px 0", color: "#333" }}>{email}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #dfe5ec" }}>
                  <td style={{ padding: "8px 0", color: "#666", fontWeight: "500" }}>University:</td>
                  <td style={{ padding: "8px 0", color: "#333" }}>{university}</td>
                </tr>
                {city && (
                  <tr style={{ borderBottom: "1px solid #dfe5ec" }}>
                    <td style={{ padding: "8px 0", color: "#666", fontWeight: "500" }}>City:</td>
                    <td style={{ padding: "8px 0", color: "#333" }}>{city}</td>
                  </tr>
                )}
                <tr>
                  <td style={{ padding: "8px 0", color: "#666", fontWeight: "500" }}>Submission Date:</td>
                  <td style={{ padding: "8px 0", color: "#333" }}>{formattedDate}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* What's Next */}
          <div style={{ margin: "30px 0" }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#333", fontSize: "16px", fontWeight: "bold" }}>
              What&apos;s Next?
            </h3>
            <ol style={{ margin: "0", paddingLeft: "20px", color: "#555", lineHeight: "1.8" }}>
              <li style={{ marginBottom: "10px" }}>
                Our team will carefully review your application over the next 2-3 weeks.
              </li>
              <li style={{ marginBottom: "10px" }}>
                If selected, you&apos;ll receive an interview notification via email.
              </li>
              <li>
                Feel free to reach out if you have any questions about the program.
              </li>
            </ol>
          </div>

          {/* Social Media Links */}
          {facebook && (
            <div
              style={{
                backgroundColor: "#f0f4f8",
                borderRadius: "6px",
                padding: "15px",
                margin: "20px 0",
              }}
            >
              <p style={{ margin: "0 0 10px 0", fontSize: "14px", fontWeight: "bold", color: "#333" }}>
                Connect With Us:
              </p>
              <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
                <a
                  href={`https://facebook.com/${facebook.replace(/^(https?:\/\/)?(www\.)?facebook\.com\//, "").replace(/\/$/, "")}`}
                  style={{ color: "#667eea", textDecoration: "none", fontWeight: "500" }}
                >
                  Visit our Facebook page
                </a>
                {" to stay updated with our latest news and updates."}
              </p>
            </div>
          )}

          {/* Closing */}
          <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6", margin: "20px 0 0 0" }}>
            We&apos;re thrilled to have you as part of our community and look forward to potentially working with you as an Ambassador!
          </p>

          <p style={{ fontSize: "14px", color: "#999", margin: "20px 0 0 0" }}>
            Best regards,
            <br />
            <strong>The next ECA Team</strong>
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderTop: "1px solid #e0e0e0",
            padding: "20px",
            textAlign: "center",
            fontSize: "12px",
            color: "#999",
          }}
        >
          <p style={{ margin: "0" }}>
            © 2026 next ECA Student Leadership Program. All rights reserved.
          </p>
          <p style={{ margin: "10px 0 0 0" }}>
            This email was sent to {email} because you applied to become a next ECA Ambassador.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationEmail
