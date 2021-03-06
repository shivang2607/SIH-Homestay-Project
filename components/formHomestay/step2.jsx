import { useFormContext, useFieldArray } from "react-hook-form";

import classNames from "classnames";
import {
  Switch,
  FormControl,
  FormLabel,
  StylesProvider,
} from "@chakra-ui/react";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import styles from "../../styles/homestayform.module.css";
// import  TimePicker  from "react-time-picker"
import React, { useState } from "react";
import { MdDelete, MdAddBox } from "react-icons/md";

function Step2(props) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "rules", // unique name for your Field Array
    }
  );

  return (
    <div style={{ borderRadius: "10px" }} className= {`${styles.cardbody} card mb-5 mt-3 shadow`}>
      <div className={`${styles.cardhead} card-header p-3 `}>Homestay Info</div>
      <div className="card-body" >
        <div className="row ">
          <div className="form-group col">
            <label htmlFor="homestayName" className="mb-1">
              Homestay Name
            </label>

            <input
              id="homestayName"
              name="homestayName"
              type="text"
              className={classNames(`${styles.textfield} form-control`, {
                "is-invalid": errors.homestayName,
              })}
              placeholder="Homestay Name"
              {...register("homestayName", {
                required: "This is required",
              })}
            />
            {errors.homestayName && (
              <div className="invalid-feedback">
                {errors.homestayName.message}
              </div>
            )}
          </div>

          <div className="form-group col">
            <label htmlFor="maxAccomodation" className="mb-1">
              Accomodation
            </label>
            <input
              id="maxAccomodation"
              name="maxAccomodation"
              type="number"
              className={classNames(`${styles.textfield} form-control`, {
                "is-invalid": errors.maxAccomodation,
              })}
              min='1'
              placeholder="Accomodation"
              {...register("maxAccomodation", {
                required: "This is required",
              })}
            />
            {errors.maxAccomodation && (
              <div className="invalid-feedback">
                {errors.maxAccomodation.message}
              </div>
            )}
          </div>
        </div>

        <div className="row ">
          <div className="form-group col-sm-6 col-md-6">
            <label htmlFor="rent" className="mb-1">
              Rent
            </label>
            <input
              id="rent"
              name="rent"
              type="number"
              className={classNames(`${styles.textfield} form-control`, {
                "is-invalid": errors.rent,
              })}
              min='1'
              max='10000'
              placeholder="Rent per Person"
              {...register("rent", {
                required: "This is required",
              })}
            />
            {errors.rent && (
              <div className="invalid-feedback">{errors.rent.message}</div>
            )}
          </div>
        <div className="col-sm-6 col-md-6">
          <div className={`${styles.timeRangeContainer} `}>
          <label htmlFor="openTime" className="mb-2 mx-2"  >Open Time</label>
            <TimeRangePicker
              amPmAriaLabel="Select AM/PM"
              className={styles.timerange}
              required={true}
              id="openTime"
              name="openTime"
              //wrapperClassName={styles.react-timerange-picker__wrapper}
              clearAriaLabel="Clear value"
              clearIcon={null}
              clockAriaLabel="Toggle clock"
              hourAriaLabel="Hour"
            //  maxDetail="minute"
              minuteAriaLabel="Minute"
              nativeInputAriaLabel="Time"
              value={props.time}
              onChange={props.settime}
              
            />
             
          </div>
          </div>
        </div>

        <div className="form-group col my-3 ">
          {/* <label htmlFor="descript" className="mb-1">Description</label> */}
          <textarea
            id="descript"
            name="descript"
            type="text"
            className={classNames(` ${styles.textfield} form-control`, {
              "is-invalid": errors.descript,
            })}
            placeholder="Description"
            {...register("descript", {
              required: "This is required",
            })}
          />
          {errors.descript && (
            <div className="invalid-feedback">{errors.descript.message}</div>
          )}
        </div>

        <fieldset className={`${styles.features} row border p-4 my-3 mx-1 `}>
          <legend>Features</legend>

          <div className="row ">
            <FormControl display="flex" className=" col col-xs-12 mb-2">
              <Switch
                id="tolerrenceNonveg"
                name="tolerrenceNonveg"
                {...register("tolerrenceNonveg")}
              />
              <FormLabel htmlFor="tolerrenceNonveg" mb="0">
                Non-veg Tolerrence
              </FormLabel>
            </FormControl>

            <FormControl display="flex" className=" col  col-xs-12 mb-2 ">
              <Switch id="nonVeg" name="nonVeg" {...register("nonVeg")} />
              <FormLabel htmlFor="nonVeg" mb="0">
                Non-vegetarian      
              </FormLabel>
            </FormControl>

            <FormControl display="flex" className="col  col-xs-12 mb-2 ">
              <Switch id="pet" name="pet" {...register("pet")} />
              <FormLabel htmlFor="pet" mb="0">
                Pets Allowed
              </FormLabel>
            </FormControl>
          </div>

          <div className="row">
            <FormControl display="flex" className=" col col-xs-12 mb-2 ">
              <Switch id="couple" name="couple" {...register("couple")} />
              <FormLabel htmlFor="couple" mb="0">
                Couple friendly
              </FormLabel>
            </FormControl>

            <FormControl display="flex" className=" col col-xs-12 mb-2">
              <Switch id="alcohol" name="alcohol" {...register("alcohol")} />
              <FormLabel htmlFor="alcohol" mb="0">
                Alcohol Tolerrence
              </FormLabel>
            </FormControl>

            <FormControl display="flex" className="col col-xs-12 mb-2 ">
              <Switch id="ac" name="ac" {...register("ac")} />
              <FormLabel htmlFor="ac" mb="0">
                Air Conditioner
              </FormLabel>
            </FormControl>
          </div>
        </fieldset>

<fieldset className={`${styles.features} row border p-4 my-3 mx-1 `}>
          <legend>Rules</legend>

        {fields.map((field, index) => (
          <div key={index} className= {`${styles.rules} form-group  my-2 mx-1`}>
            <div className={styles.rulesText}>
              <input
                id={`rules.${index}`}
                key={field.id}
                name={`rules.${index}`}
                type="text"
                className={classNames(`${styles.textfield} form-control my-1`, {
                  "is-invalid": errors.rules?.[index],
                })}
                placeholder={"Rule " + [index + 1]}
                {...register(`rules.${index}`, {
                  required: "This is required",
                })}
              />
            </div>
            {errors.rules?.[index] && (
              <div className="invalid-feedback">
                {errors.rules?.[index]?.message}
              </div>
            )}

            <div className={styles.rulesDelete}>
              <button
                type="button"
                className="btn col "
                onClick={() => remove(index)}
              >
                
                <MdDelete color="tomato" size={40} />
              </button>
            </div>
          </div>
        ))}



        <button
          type="button"
          className="btn mr-2 "
          onClick={() => append(null)}
        >
         <MdAddBox color="blue" size={70}/>
        </button>
        </fieldset>
      </div>
    </div>
  );
}

export default Step2;
