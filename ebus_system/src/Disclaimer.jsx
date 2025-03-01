
const Disclaimer = () => {
  return (
    <>
      <div className='w-full h-16 primary my-10'>
        <h1 className='text-center text-3xl font-bold uppercase leading-14 text-white'>Disclaimer</h1>
      </div>
      <div className="mx-18">
        <p className="mb-4">
          Welcome to <strong>EbusSystem</strong>. By using this app, you acknowledge and agree to the terms outlined in this disclaimer.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. General Information</h2>
        <p className="mb-4">
          EbusSystem is a platform designed to assist users in finding and booking buses, managing driver and admin data, and offering related services.
          While we strive to provide accurate and up-to-date information, we do not guarantee the completeness, accuracy, or reliability of the information presented.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. No Guarantees</h2>
        <p className="mb-4">
          EbusSystem serves as an intermediary platform for bus management and user interactions. We do not guarantee the availability, punctuality, or quality of services provided by third-party operators or drivers listed on the app.
        </p>

        <h2 className="text-xl font-semibold mb-2">3. Third-Party Services</h2>
        <p className="mb-4">
          EbusSystem may display information provided by third parties, such as bus operators and drivers. We are not responsible for the conduct, behavior, or actions of these third parties. Users are encouraged to exercise due diligence when using their services.
        </p>

        <h2 className="text-xl font-semibold mb-2">4. Liability Limitation</h2>
        <p className="mb-4">
          EbusSystem and its developers shall not be held liable for any loss, damage, or inconvenience caused as a result of using the app or relying on the information provided. This includes, but is not limited to, missed bookings, delays, cancellations, or any other issues arising from the use of third-party services.
        </p>

        <h2 className="text-xl font-semibold mb-2">5. Technical Issues</h2>
        <p className="mb-4">
          While we aim to maintain the uninterrupted operation of the app, we cannot guarantee that the app will be free of errors, bugs, or technical issues. Users are advised to report any issues they encounter, and we will strive to resolve them promptly.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. User Responsibility</h2>
        <p className="mb-4">
          Users are responsible for providing accurate information when using the app and ensuring the confidentiality of their login credentials. EbusSystem is not responsible for unauthorized access to user accounts.
        </p>

        <h2 className="text-xl font-semibold mb-2">7. Policy Updates</h2>
        <p className="mb-4">
          This disclaimer may be updated from time to time. Users are encouraged to review it periodically to stay informed about any changes.
        </p>

        <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
        <p className="mb-10">
          For any questions, concerns, or issues, please contact us at{' '}
          <a href="mailto:support@ebussystem.com" className="text-blue-600 underline">
            support@ebussystem.com
          </a>.
        </p>
      </div>

    </>
  )
}

export default Disclaimer