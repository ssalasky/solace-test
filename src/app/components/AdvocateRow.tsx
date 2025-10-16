import {formatPhoneNumber} from '@/lib/helpers';
import {Advocate} from "@/lib/types";
import Link from 'next/link';

interface AdvocateRowProps {
  advocate: Advocate;
}

const AdvocateRow = ({ advocate }: AdvocateRowProps) => {
  return (
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
  )
}

export default AdvocateRow;