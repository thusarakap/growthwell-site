import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-300 py-10 px-5 md:px-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Site Name */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-primary">Growthwell</h2>
          <p>Providing high-quality nutritional supplements for animals.</p>
        </div>
        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/">
                <p className="hover:text-primary">Home</p>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <p className="hover:text-primary">About</p>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <p className="hover:text-primary">Products</p>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <p className="hover:text-primary">Contact</p>
              </Link>
            </li>
          </ul>
        </div>
        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        {/* Signup Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="mb-4">Sign up to receive updates and special offers.</p>
          <form className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4">
            <div className="flex-1 mt-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-200"
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-3 mt--0.5 bg-gray-900 bg-opacity-90 text-white rounded-md shadow-md hover:bg-gray-900 duration-300 inline-block text-center whitespace-nowrap"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
