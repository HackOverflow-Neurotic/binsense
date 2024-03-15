import { ReactHTML, ReactNode } from "react";

interface Props{
    children: ReactNode
}

const PageContainer:React.FC<Props> = ({children}) => {
    return(
        <>
            <div className="pt-[8rem] lg:max-w-[80vw] max-w-[90vw] mx-auto">
                {children}
            </div>
        </>
    )
}

export default PageContainer;