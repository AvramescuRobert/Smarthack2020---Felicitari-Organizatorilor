import * as React from "react";
import {Box, Button, CssBaseline, Grid, useTheme} from "@material-ui/core";
import {useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import NavBar from "../../shared/NavBar";
import EditSchoolStatus from "./EditSchoolStatus";
import {useHttpClient} from "../../hooks/http-hooks";
import Overview from "./Overview";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            display: 'flex',
            width: '100%',
            marginTop: theme.spacing(2)
        },
        root: {
            marginTop: theme.spacing(4),
            display: 'flex',
            marginLeft: '10%'
        },
        button: {},
        gridItem: {
            padding: theme.spacing(1)
        }
    }),
);

const StatsPage: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const [editDialog, setEditDialog] = useState(false);
    const [color, setBackgroundColor] = useState('#F6D55C');
    const [name, setName] = useState('galben');
    const auth = useContext(AuthContext);

    const openEditCellDialog = () => {
        setEditDialog(true);
    };


    const editCell = async (value: any) => {
        let newStatus;
        if (value === "verde") {
            setBackgroundColor('#3CAEA3');
            setName("verde");
            newStatus = "full offline";
        }
        if (value === "rosu") {
            setBackgroundColor('#ED553B');
            setName("rosu");
            newStatus = "full online";
        }
        if (value === "galben") {
            setBackgroundColor('#F6D55C');
            setName("galben");
            newStatus = "hibrid";
        }

        const response = await sendRequest('http://localhost:8000/api/users/update-status-for-current-day', 'POST', JSON.stringify({
            schoolId: auth.schoolId,
            newStatus: newStatus
        }), {'content-type': 'application/json'});
        console.log(response);
    };

    return (
        <Box className={classes.root}>
            <Grid item md={5} lg={5} xl={5} sm={12} xs={12}>
                <Grid container>
                    <Grid item md={12} lg={12} xl={12} sm={12} xs={12} className={classes.gridItem}>
                        <Button disabled={true} component="h2" className={classes.button}
                                style={{background: color, color: "black", width: '90%'}}>
                            Scoala se afla in scenariul: {name}
                        </Button>
                    </Grid>
                    {name === "rosu" &&
                    <Grid item md={12} lg={12} xl={12} sm={12} xs={12} className={classes.gridItem}>
                        <Button onClick={async () => {
                            await sendRequest("http://localhost:8000/api/admin/close-school-alert", 'GET',
                                null, {'content-type': 'application/json'});
                        }} style={{
                            backgroundColor: "#d1d1e0",
                            width: '90%',
                        }} className={classes.button}>
                            Anunta inchiderea scolii
                        </Button>
                    </Grid>}

                    <Grid item md={12} lg={12} xl={12} sm={12} xs={12} className={classes.gridItem}>
                        {editDialog &&
                        <EditSchoolStatus setEditDialog={setEditDialog}
                                          editCell={editCell}
                                          open={editDialog}
                        />
                        }
                        <Button onClick={openEditCellDialog} style={{
                            backgroundColor: "#d1d1e0",
                            width: '90%'
                        }} className={classes.button}>
                            Schimba statusul scolii
                        </Button>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12} sm={12} xs={12} className={classes.gridItem}>
                        <Button onClick={async () => {
                            await sendRequest("http://localhost:8000/api/admin/send-stats", 'PATCH',
                                JSON.stringify({
                                    schoolId: "5f9ddea4d86051e5cda70d8a"
                                }), {'content-type': 'application/json'});

                        }} style={{
                            width: '90%',
                            backgroundColor: "#d1d1e0",
                        }} className={classes.button}>
                            Trimite raportul la Inspectorat
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Overview/>
            </Grid>
        </Box>
    );
};

export default StatsPage;
