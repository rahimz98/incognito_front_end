import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import history from '../history';
import { useSelector } from 'react-redux';



const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },
}));

const SwipeableTextMobileStepper = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { images, projectId } = props;
    const user = useSelector((store) => store.user);
    const [activeStep, setActiveStep] = React.useState(0);
    let maxSteps = 0 

    if (images){
        maxSteps = images.length;
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const handleOpen = () => {
        history.push(`/${user.id}/${projectId}/gallery`);
    }

    return (
        <div className={classes.root}>
            {images ?
                <>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {Object.entries(images).map(([imageName,imageLink], index) => (
                            <div >
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <img className={classes.img} src={imageLink} alt="image" onClick={handleOpen}/>
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        variant="text"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                              Next
                              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                          }
                          backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                              Back
                            </Button>
                          }
                        
                    />
                </>
                : <div />}
        </div>
    );
}

export default SwipeableTextMobileStepper;