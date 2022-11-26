import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import DetailedGrades from './DetailedGrades';
import SimpleGrades from './SimpleGrades';

interface Props {
	data: any
	loaded: boolean
}
function Simple({ data, loaded }: Props) {
	return <>{loaded ? <DetailedGrades data={data} /> : <SimpleGrades data={data} />}</>
}

export default Simple
