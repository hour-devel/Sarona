import React from 'react'
import { Spinner } from "@nextui-org/react";

const SpinnerLoadingComponent = () => {
    return (
        <div> <div className="w-screen h-screen relative">
            <Spinner size="lg" className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
        </div>
        </div>
    )
}

export default SpinnerLoadingComponent
