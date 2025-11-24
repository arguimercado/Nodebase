"use client"

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
}

const EntityContainer = ({ children, header, search, pagination }: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto  w-full flex flex-col gap-y-8">
        {header}
      </div>
      <div className="flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  )
}
export default EntityContainer