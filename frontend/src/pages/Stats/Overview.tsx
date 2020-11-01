import * as React from "react";
import {
    Grid,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";
import moment from "moment";
import {useHttpClient} from "../../hooks/http-hooks";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name: string, calories: number) {
    return {name, calories};
}

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 356)
];

const Overview: React.FC = () => {
    const classes = useStyles();
    const {sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);
    const [overviewContext, setOverview] = useState(null);

    useEffect(() => {
        const getStatsData = async () => {
            try {
                console.log("auth: ", auth);
                const response = await sendRequest(`http://localhost:8000/api/schools/get-school-statistics`, 'PATCH',
                    JSON.stringify({
                        schoolId: auth.schoolId
                    }), {'content-type': 'application/json'});
                console.log(response);
                setOverview(response);
            } catch (err) {
                console.log(err);
            }
        };
        getStatsData();
    }, [sendRequest, auth]);

    return (
        <div>
            <Typography variant="h5" component="h2">
                Numar total cazuri: 0
            </Typography>
            <Typography variant="h5" component="h2">
                Numar clase in care sunt distribuite clasele: 2
            </Typography>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Numar cazuri</TableCell>
                            <TableCell align="right">Clasa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Overview;
