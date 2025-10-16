const SkeletonRow = () => {
  return (
    <tr>
      <td className="w-[150px] px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="w-[150px] px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="w-[120px] px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="w-[100px] px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="min-w-[200px] px-6 py-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
      </td>
      <td className="w-[100px] px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="w-[140px] px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
    </tr>
  );
}

export default SkeletonRow;