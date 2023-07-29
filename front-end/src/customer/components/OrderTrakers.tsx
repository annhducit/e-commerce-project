import { Stepper, Step, StepLabel } from "@mui/material";

const steps = [
    "Placed",
    "Order Confirm",
    "Shipper",
    "Out Of Delivery",
    "Delivered",
];

const OrderTrakers = ({ activeStep }: { activeStep: number }) => {
    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default OrderTrakers;
