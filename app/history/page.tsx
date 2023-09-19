'use client'

import {selectGenerator, useSelector} from "@/lib/redux";
import {Table} from "@/app/components/Table/Table";

export default function HistoryPage() {
    const generatedNumber = useSelector(selectGenerator)

    return (
        <>
            <Table/>
        </>
    )
}
