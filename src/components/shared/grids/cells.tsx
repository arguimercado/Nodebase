import Link from "next/link";


export const HeaderColumn = ({children,alignment} : {children: React.ReactNode, alignment?: "left" | "center" | "right"}) => {
   
   const alignmentClasses = alignment === "center" ? "justify-center" : alignment === "right" ? "justify-end" : "justify-start";
   return (
      <div className={`w-full flex items-center ${alignmentClasses}`}>
         {children}
      </div>
   )
}

export const LinkCell = ({children,className,href} : {children: React.ReactNode, className?: string, href: string}) => {
   return (
      <Link href={href} className={`text-blue-600 hover:underline ${className}`} prefetch>
         {children}
      </Link>
   )
}