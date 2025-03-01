
const Footer = () => {
  return (
    <>
      <footer className="w-full bmd:flex md:items-center md:justify-between  bg-gray-900 shadow-sm dark:bg-gray-900 text-primary  ">   
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                  <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-primary">EbusSystem</span>
                  </a>
                  <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-primary sm:mb-0 dark:text-white">
                      <li>
                          <a href="/about" className="hover:underline me-4 md:me-6">About</a>
                      </li>
                      <li>
                          <a href="/privacy_policy" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="/disclaimer" className="hover:underline me-4 md:me-6">Disclaimer</a>
                      </li>
                      <li>
                          <a href="/contact" className="hover:underline">Contact</a>
                      </li>
                  </ul>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <div className="md:flex md:items-center md:justify-between">
                <span className="block text-sm text-white sm:text-center dark:text-white">© 2025 <a href="http://localhost:5173/" className="hover:underline">EbusSystem</a>. All Rights Reserved.</span>
                <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                    <a target="_blank" href="https://www.facebook.com/" className="text-white hover:text-primary dark:hover:text-primary">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                              <path d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" />
                          </svg>
                        <span className="sr-only">Facebook page</span>
                    </a>

                    <a target="_blank" href="https://www.linkedin.com/" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        {/* LinkedIn */}
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.5c0-1.38-.03-3.17-1.93-3.17s-2.22 1.51-2.22 3.07v5.6h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v5.6z"/>
                        </svg>
                        <span className="sr-only">LinkedIn profile</span>
                    </a>

                    <a target="_blank" href="https://www.instagram.com/" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        {/* Instagram */}
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.328 3.608 1.302.975.976 1.24 2.243 1.302 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.328 2.633-1.302 3.608-.976.975-2.243 1.24-3.608 1.302-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.328-3.608-1.302-.975-.976-1.24-2.243-1.302-3.608-.058-1.266-.07-1.645-.07-4.85s.012-3.584.07-4.85c.062-1.366.328-2.633 1.302-3.608.976-.975 2.243-1.24 3.608-1.302 1.266-.058 1.645-.07 4.85-.07zm0-2.163c-3.258 0-3.667.014-4.947.072-1.516.07-2.54.326-3.437 1.222-.898.897-1.153 1.921-1.222 3.437-.058 1.28-.072 1.689-.072 4.947s.014 3.667.072 4.947c.07 1.516.326 2.54 1.222 3.437.897.898 1.921 1.153 3.437 1.222 1.28.058 1.689.072 4.947.072s3.667-.014 4.947-.072c1.516-.07 2.54-.326 3.437-1.222.898-.897 1.153-1.921 1.222-3.437.058-1.28.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.07-1.516-.326-2.54-1.222-3.437-.897-.898-1.921-1.153-3.437-1.222-1.28-.058-1.689-.072-4.947-.072zm0 5.838a6.162 6.162 0 1 1 0 12.324 6.162 6.162 0 0 1 0-12.324zm0 10.162a3.99 3.99 0 1 0 0-7.98 3.99 3.99 0 0 0 0 7.98zm6.406-10.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                        </svg>
                        <span className="sr-only">Instagram profile</span>
                    </a>

                    <a target="_blank" href="https://twitter.com/" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                          <path d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" />
                      </svg>
                        <span className="sr-only">Twitter page</span>
                    </a>
                    
                </div>
              </div>
            </div>
      </footer>

    </>
  )
}

export default Footer