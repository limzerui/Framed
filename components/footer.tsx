import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="font-bold text-xl text-gray-900">Zine Studio</div>

          <div className="flex space-x-8 text-sm text-gray-600">
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2025 Zine Studio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
