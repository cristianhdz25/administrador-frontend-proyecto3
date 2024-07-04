import React from 'react';
import { Spinner } from "keep-react";

const SpinnerComponent = ({show}) => {

    return (
        <div>
            {show &&
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[9999]">
                    <Spinner color="info" size="xl" />
                </div>
            }
        </div>
    );
};

export default SpinnerComponent;