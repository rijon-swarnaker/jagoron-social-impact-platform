import { connection } from 'next/server';
import React from 'react';

const CurrentYear = async () => {
    await connection();
    return <>{new Date().getFullYear()}</>;
};

export default CurrentYear;
