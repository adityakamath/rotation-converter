import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { RotationFormat } from '@/types/rotations';

const formats = [
  { id: 'euler', name: 'Euler Angles' },
  { id: 'quaternion', name: 'Quaternion' },
  { id: 'matrix', name: 'Rotation Matrix' },
  { id: 'axisAngle', name: 'Axis-Angle' },
] as const;

interface FormatSelectProps {
  value: RotationFormat;
  onChange: (value: RotationFormat) => void;
  label?: string;
}

export default function FormatSelect({ value, onChange, label = 'Format' }: FormatSelectProps) {
  const selected = formats.find(format => format.id === value) || formats[0];

  return (
    <div className="w-full">
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </Listbox.Label>
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
              {formats.map((format) => (
                <Listbox.Option
                  key={format.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                    }`
                  }
                  value={format.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {format.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
} 