"use client"

type EntityContainerProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  
}

const EntityContainer = ({ children, header, search }: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 flex flex-col gap-y-6">
      <div className="mx-auto  w-full flex flex-col gap-y-8">
        {header}
      </div>
      {children && (
        <div className="flex flex-col gap-y-4">
          {children}
        </div>

      )}
    </div>
  )
}
export default EntityContainer