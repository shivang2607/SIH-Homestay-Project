import { Flex, Heading, Button, Center } from "@chakra-ui/react";
import Spinner from "react-bootstrap/Spinner";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FiClipboard, FiDollarSign, FiUser } from "react-icons/fi";
import { ImLocation } from "react-icons/im";
import React, { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { useFirebase } from "../../context/firebaseContext";
import styles from "../../styles/homestayform.module.css";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";

const steps = [
  { label: "Personal Info", icon: FiUser },
  { label: "HomeStay Info", icon: FiClipboard },
  { label: "Location", icon: ImLocation },
];

export const HomestayForm = () => {
  const router = useRouter();
  const { addHomestay, getUserCookies } = useFirebase();
  const [city, setcity] = React.useState("");
  const [state, setstate] = React.useState("");
  const [time, settime] = useState(["6:00", "11:00"]);
  const [loading, setLoading] = useState(false);
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const { details } = getUserCookies();
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  function GetContent(index) {
    switch (index) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 settime={settime} time={time} />;
      case 2:
        return <Step3 setcity={setcity} setstate={setstate} />;
    }
  }

  const onSubmit = async (data) => {
    if (activeStep === steps.length - 1) {
      console.log(state, Object.assign(data, { city: city }));
      setLoading(true);
      await addHomestay(
        data.homestayName,
        data.descript,
        data.hostName,
        data.email,
        data.phone,
        Number(data.males),
        Number(data.females),
        Number(data.children),
        data.pet,
        data.alcohol,
        data.couple,
        data.tolerrenceNonveg,
        data.nonVeg,
        data.rules,
        tConvert(time[0]) + " to " + tConvert(time[1]),
        data.ac,
        city,
        state,
        data.address,
        Number(data.maxAccomodation),
        Number(data.rent),
        data.popularDestinations,
        data.images,
        Number(data.airportDistance),
        Number(data.busDistance),
        Number(data.railwayDistance)
      );
      setLoading(false);
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
      email: details.email,
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
      rules: ["Enter Rule"],
      popularDestinations: [{ head: "", body: "" }],
      images: [{}],
      airportDistance: "",
      railwayDistance: "",
      busDistance: "",
    },
  });

  return (
    <div className={styles.wholecard}>
      <Center>
        {" "}
        <Flex flexDir="column" className={`${styles.form} my-5 `}>
          <Steps
            activeStep={activeStep}
            className={`${styles.stepper} mb-4 mt-3`}
          >
            {steps.map(({ label, icon, size }, index) => (
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
              height="100vh"
            >
              <Heading fontSize="xl" textAlign="center">
                Woohoo! All steps completed!
              </Heading>
              <Button
                // variant={"info"}
                colorScheme={"purple"}
                w={"max-content"}
                mx={"auto"}
                mt={"2rem"}
                onClick={() => {
                  {
                    router.replace(`/users/${details.token.slice(5, 25)}`);
                  }
                }}
              >
                Go To Dashboard
              </Button>
            </Flex>
          ) : (
            <FormProvider {...methods}>
              <form
                id="homestay"
                className="mb-3"
                onSubmit={methods.handleSubmit(onSubmit)}
                hidden={loading}
              >
                {GetContent(activeStep)}
                <Button
                  type="button"
                  className={styles.btn}
                  isDisabled={activeStep === 0}
                  mr={4}
                  onClick={prevStep}
                  size="lg"
                  variant="ghost"
                >
                  Prev
                </Button>
                <Button
                  size="lg"
                  type="submit"
                  value="Update"
                  className={styles.btn}
                  onClick={() => {}}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </form>
              <Flex
                px={4}
                py={4}
                width="100%"
                flexDirection="column"
                className="mb-2 mt-2"
                height="100vh"
              >
                <Center>
                  {" "}
                  <h1 hidden={!loading}>Wait Uploading</h1>
                  <br></br>
                  <Spinner
                    hidden={!loading}
                    animation="border"
                    role="status"
                  ></Spinner>
                </Center>{" "}
              </Flex>
            </FormProvider>
          )}
        </Flex>
      </Center>
    </div>
  );
};

export default HomestayForm;

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
