import React from "react";
import ReactExport from "react-export-excel";
import { groupBy } from 'lodash'
import { Button } from '@material-ui/core'
import Statuses from '../consts/Statuses'
import uniqid from 'uniqid'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Download = (props) => {
    const { tasks } = props;

    const tasksToExport = groupBy(tasks.map(task => {
        return {
            ...task,
            status: Statuses[task.status],
            dateCreated: task.dateCreated.toLocaleDateString(),
            dateDone: task.dateDone.toLocaleDateString()
        };
    }), (task) => task.dateCreated)

    return (
        <ExcelFile
            element={
                <Button size="large" variant="contained" color="primary" style={{ marginRight: 20 }}>
                    export
                </Button>
            }
            filename="Tasks"
        >
            {
                Object.keys(tasksToExport).map(date => {
                    return (
                        <ExcelSheet key={uniqid()} data={tasksToExport[date]} name={date}>
                            <ExcelColumn label="Title" value="title" />
                            <ExcelColumn label="Description" value="description" />
                            <ExcelColumn label="Date Created" value="dateCreated" />
                            <ExcelColumn label="Status" value="status" />
                            <ExcelColumn label="Date Done" value="dateDone" />
                        </ExcelSheet>
                    )
                })
            }

        </ExcelFile>
    );
}

export default Download;