import AdvocateRow from '@/app/components/AdvocateRow';
import SkeletonRow from '@/app/components/SkeletonRow';
import {Advocate} from '@/lib/types';

interface AdvocatesTableProps {
  advocates: Advocate[];
  isLoading: boolean;
}

const AdvocatesTable = ({ advocates, isLoading }: AdvocatesTableProps ) => {
  return <div className="overflow-x-auto">
    <div className="max-h-[75vh] overflow-y-auto">
      <table className="min-w-full border-collapse table-fixed">
        <thead className="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            First Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Last Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            City
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Degree
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Specialties
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Years of Experience
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Phone Number
          </th>
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {isLoading && (
          <>
            {Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)}
          </>
        )}
        {!isLoading && advocates.length === 0 ? (
          <tr>
            <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
              No advocates match your criteria
            </td>
          </tr>
        ) : advocates.map((advocate) => (
          <AdvocateRow advocate={advocate} key={advocate.id} />
        ))}
        </tbody>
      </table>
    </div>
  </div>
}

export default AdvocatesTable