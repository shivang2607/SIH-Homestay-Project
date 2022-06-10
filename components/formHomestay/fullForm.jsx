import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiClipboard, FiDollarSign, FiUser } from "react-icons/fi";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const steps = [
  { label: "Personal Info", icon: FiUser },
  { label: "HomeStay Info", icon: FiClipboard },
  { label: "Location", icon: FiDollarSign },
];
const FullForm = () => {
  const [city, setcity] = React.useState("");
  const [state, setstate] = React.useState("");
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  function GetContent(index) {
    switch (index) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 setcity={setcity} setstate={setstate} />;
    }
  }

  const onSubmit = (data) => {
    // console.log(city,state,data)

    if (activeStep === steps.length - 1) {
      console.log(state, Object.assign(data, { city: city }));
    }
    nextStep();
  };

  const methods = useForm({
    defaultValues: {
      hostName: "",
      phone: "",
      adhar: "",
      males: "",
      females: "",
      children: "",
      email: "",
      homestayName: "",
      descript: "",
      maxAccomodation: "",
      rent: "",
      address: "",
      nonVeg: false,
      pet: false,
      couple: false,
      ac: false,
      alcohol: false,
      tolerrenceNonveg: false,
      opTime1: "",
      opTime2: "",
      rules: ["Enter Rule"],
      popularDestinations: [{ head: "", body: "" }],
      images: [{}],
    },
  });

  return (
    <Center>
      {" "}
      <Flex flexDir="column" width="80%">
        <Steps activeStep={activeStep} className="mb-2 mt-3">
          {steps.map(({ label, icon }, index) => (
            <Step label={label} key={label} icon={icon}></Step>
          ))}
        </Steps>

        {activeStep === steps.length ? (
          <Flex
            px={4}
            py={4}
            width="100%"
            flexDirection="column"
            className="mb-2 mt-2"
          >
            <Heading fontSize="xl" textAlign="center">
              Woohoo! All steps completed!
            </Heading>
          </Flex>
        ) : (
          <FormProvider {...methods}>
            <form
              id="homestay"
              className="mb-3"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              {GetContent(activeStep)}
              <Button
                type="button"
                isDisabled={activeStep === 0}
                mr={4}
                onClick={prevStep}
                size="sm"
                variant="ghost"
              >
                Prev
              </Button>
              <Button size="sm" type="submit" value="Update">
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        )}
      </Flex>
    </Center>
  );
};

export default FullForm;
