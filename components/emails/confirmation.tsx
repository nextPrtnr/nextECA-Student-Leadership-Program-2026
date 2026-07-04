import React from "react"

interface ConfirmationEmailProps {
  fullName: string
  email: string
  university: string
  facebook?: string
  city?: string
  submissionDate?: string
}

export function ConfirmationEmail({
  fullName,
  email,
  university,
  facebook,
  city,
  submissionDate,
}: ConfirmationEmailProps) {
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
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <h2>Welcome to next ECA!</h2>
      <p>Hello {fullName},</p>
      
      <p>Thank you for your interest in becoming a next ECA Student Ambassador! We are excited to have received your application and deeply appreciate your passion for creating positive impact in our community.</p>

      <h3>Your Application Details:</h3>
      <ul>
        <li><strong>Full Name:</strong> {fullName}</li>
        <li><strong>Email:</strong> {email}</li>
        <li><strong>University:</strong> {university}</li>
        {city && <li><strong>City:</strong> {city}</li>}
        <li><strong>Submission Date:</strong> {formattedDate}</li>
      </ul>

      <h3>What's Next?</h3>
      <ol>
        <li>Our team will carefully review your application over the next 2-3 weeks.</li>
        <li>If selected, you will receive an interview notification via email.</li>
        <li>Feel free to reach out if you have any questions about the program.</li>
      </ol>

      {facebook && (
        <p>
          <strong>Connect With Us:</strong><br />
          Visit our Facebook page at{" "}
          <a href={`https://facebook.com/${facebook.replace(/^(https?:\/\/)?(www\.)?facebook\.com\//, "").replace(/\/$/, "")}`}>
            {facebook}
          </a>{" "}
          to stay updated with our latest news and updates.
        </p>
      )}

      <p>We are thrilled to have you as part of our community and look forward to potentially working with you as an Ambassador!</p>

      <p>
        Best regards,<br />
        <strong>The next ECA Team</strong>
      </p>

      <hr style={{ marginTop: "30px", borderTop: "1px solid #ddd" }} />
      <p style={{ fontSize: "12px", color: "#999" }}>
        © 2026 next ECA Student Leadership Program. All rights reserved.<br />
        This email was sent to {email} because you applied to become a next ECA Ambassador.
      </p>
    </div>
  )
}
