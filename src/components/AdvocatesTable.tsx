import {formatPhoneNumber} from '@/lib/helpers';
import {Advocate} from '@/lib/types';
import Link from 'next/link';

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
        {advocates.map((advocate) => (
          <tr key={advocate.id}>
            <td className="w-[150px] px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{advocate.firstName}</td>
            <td className="w-[150px] px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{advocate.lastName}</td>
            <td className="w-[120px] px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{advocate.city}</td>
            <td className="w-[100px] px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{advocate.degree}</td>
            <td className="min-w-[200px] px-6 py-4">
              {advocate.specialties.map((specialty, index) => (
                <div key={index} className="text-sm text-gray-900">
                  - {specialty}
                </div>
              ))}
            </td>
            <td className="w-[100px] px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{advocate.yearsOfExperience}</td>
            <td className="w-[140px] px-6 py-4 whitespace-nowrap">
              <Link
                href={`tel:${advocate.phoneNumber}`}
                className="text-blue-600 hover:text-blue-800 font-mono text-sm transition-colors"
                title="Click to call"
              >
                {formatPhoneNumber(advocate.phoneNumber)}
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  </div>
}

export default AdvocatesTable