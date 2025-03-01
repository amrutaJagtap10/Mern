
const Privacy_policy = () => {
  return (
    <>
      <div className="bg-white">
        <div className='w-full h-16 primary my-10'>
          <h1 className='text-center text-3xl font-bold uppercase leading-14 text-white'>Privacy Policy</h1>
        </div>
        <div className="mx-18">
          <p className="mb-4">Effective Date: 10-02-2025</p>
          <p className="mb-4">
            At <strong>EbusSystem</strong>, we value your trust and are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app.
          </p>

          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect the following types of information to provide and improve our services:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, and other details provided during registration. Payment details for ticket bookings are processed securely through third-party payment gateways.
            </li>
            <li>
              <strong>Usage Data:</strong> Device information, IP address, browser type, and app usage statistics. Location data to provide accurate travel information (optional and configurable in your settings).
            </li>
            <li>
              <strong>Driver/Admin Information:</strong> Admins and drivers are required to provide additional data, such as IDs, licenses, and contact information.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>To facilitate ticket bookings and manage bus schedules.</li>
            <li>To ensure a secure login and account management experience.</li>
            <li>To communicate with users, drivers, and admins about updates, services, or issues.</li>
            <li>To analyze app usage to improve features and user experience.</li>
            <li>To comply with legal requirements and resolve disputes.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
          <p className="mb-4">
            We do not sell or rent your personal information to third parties. However, we may share your data in the following circumstances:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>With Service Providers:</strong> For payment processing, email communication, or other services.
            </li>
            <li>
              <strong>With Law Enforcement:</strong> To comply with legal obligations or respond to valid legal requests.
            </li>
            <li>
              <strong>With Third-Party Bus Operators:</strong> Limited data may be shared to fulfill your booking.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">4. Security of Your Data</h2>
          <p className="mb-4">
            We take reasonable measures to protect your data, including:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Encrypting sensitive information during transmission.</li>
            <li>Limiting access to personal data to authorized personnel only.</li>
            <li>Regularly reviewing our security practices to prevent unauthorized access.</li>
          </ul>
          <p className="mb-4">
            While we strive to protect your data, no method of transmission over the internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">
            You have the following rights regarding your data:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Access and Update:</strong> You can access or update your account information directly within the app.
            </li>
            <li>
              <strong>Delete Data:</strong> You can request the deletion of your personal information by contacting us.
            </li>
            <li>
              <strong>Opt-Out:</strong> You can opt-out of non-essential communications by updating your preferences.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            Our app may use cookies or similar tracking technologies to:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Improve app performance and user experience.</li>
            <li>Remember your preferences and settings.</li>
            <li>Collect analytics data for app optimization.</li>
          </ul>
          <p className="mb-4">
            You can control or disable cookies through your device settings.
          </p>

          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy periodically to reflect changes in our practices. Any updates will be communicated to users, and the "Effective Date" will be revised accordingly.
          </p>

          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at: 
          </p>
          <ul className="list-disc list-inside mb-10">
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@ebussystem.com" className="text-blue-600 underline">
                support@ebussystem.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong> 9856214732
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Privacy_policy