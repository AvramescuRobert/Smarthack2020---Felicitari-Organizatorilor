import * as React from "react";
import {Button} from "@material-ui/core";
import {useState} from "react";
import EditSchoolStatus from "./EditSchoolStatus";

const EditSchoolStatusButton: React.FC = () => {
    const [editDialog, setEditDialog] = useState(false);
    const [color, setBackgroundColor] = useState('');
    const openEditCellDialog = () => {
        setEditDialog(true);
    };


    const editCell = (value: any) => {
        if (value === "verde")
            setBackgroundColor('#3CAEA3');
        if (value === "rosu")
            setBackgroundColor('#ED553B');
        if (value === "galben")
            setBackgroundColor('#F6D55C');
    }

    return <div>
        {editDialog &&
            <EditSchoolStatus setEditDialog={setEditDialog}
                              editCell={editCell}
                              open={editDialog}
            />
        }
        <Button onClick={openEditCellDialog}>
            Schimba statusul scolii
        </Button>
    </div>
};

export default EditSchoolStatusButton;
