
const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4 py-10">
    <div className="max-w-6xl w-full mx-auto grid place-items-center text-center gap-4">
      {/* Spinner */}
      <div className="flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Skeleton Card */}
      <div className="animate-pulse bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-xl h-64">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  </div>
  )
}

export default Loader