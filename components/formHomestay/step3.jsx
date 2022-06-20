import { useFormContext, useFieldArray } from "react-hook-form";
import classNames from "classnames";
import React, { useState } from "react";
import places from "../../location";
import { MdDelete, MdAddBox } from "react-icons/md";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import styles from "../../styles/homestayform.module.css";

function Step3(props) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "popularDestinations", // unique name for your Field Array
    }
  );

  // props.setcity="Agra"
  // prop
  const [images, setImages] = useState(null);
  const [isValidImage, setIsValidImage] = useState(true);
  

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results)
  };

  const handleOnHover = (result) => {
    // the item hovered
    //console.log(result)
  };

  const handleOnSelect = (item) => {
    // the item selected

    props.setcity(item.City);
    props.setstate(item.State);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };
  // {console.log("hey",city)}
  const formatResult = (item) => {
    //console.log("hey", item)
    return (
      <>
        <span style={{ display: "block", textAlign: "left", fontSize: "20px" }}>
          {" "}
          {item.City}, {item.State}{" "}
        </span>
      </>
    );
  };

  return (
    
    <div style={{ borderRadius: "10px" }} className= {`${styles.cardbody} card mb-5 mt-3 shadow`}>
      <div className={`${styles.cardhead} card-header p-3 `}>Other Information </div>
      <div className="card-body">
        <fieldset className={`${styles.features} row border p-4 my-4 mx-2 `}>
          <legend>Address</legend>
          <div className="row">
            <div
              style={{
                width: 400,
                marginBottom: "2rem",
                fontSize: "20px",
                zIndex: "3",
              }}
            >
              <ReactSearchAutocomplete
                items={places}
                fuseOptions={{ keys: ["City", "District", "State"] }}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
                className="form-control"
                resultStringKeyName="cityState"
                name="cityState"
                placeholder="Enter your City/Town"
              
                styling={{
                  zIndex: "3",
                  fontSize: "1.1rem",
                  borderRadius: "5px",
                  boxShadow: "rgba(190, 182, 182, 0.986) 2px 3px 2px 0px",
                }}
              />
            </div>

            <div className="form-group col-md-6 ">
              {/* <label htmlFor="rent" className="mb-1">Address</label> */}
              <input
                id="rent"
                name="address"
                type="text"
                className={classNames(`${styles.textfield} form-control`, {
                  "is-invalid": errors.address,
                })}
                placeholder="Enter Address"
                {...register("address", {
                  required: "This is required",
                })}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address.message}</div>
              )}
            </div>
          </div>
          <div className="row my-3">
            <div className="form-group col-md-4">
              <label htmlFor="phone" className="form-label">
                Nearest AirPort
              </label>
              <div className="input-group">
                <input
                  id="airportDistance"
                  name="airportDistance"
                  type="number"
                  className={classNames(`${styles.textfield} form-control`, {
                    "is-invalid": errors.airportDistance,
                  })}
                  aria-describedby="basic-addon1"
                  {...register("airportDistance", {
                    required: "This is required",
                  })}
                />
                {errors.airportDistance && (
                  <div className="invalid-feedback">
                    {errors.airportDistance.message}
                  </div>
                )}
                <div className="input-group-append">
                  <span className={` ${styles.textfield} input-group-text`} id="basic-addon1">
                    KM
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="phone" className="form-label">
                Nearest Railway Station
              </label>
              <div className="input-group">
                <input
                  id="railwayDistance"
                  name="railwayDistance"
                  type="number"
                  className={classNames(` ${styles.textfield} form-control`, {
                    "is-invalid": errors.railwayDistance,
                  })}
                  aria-describedby="basic-addon2"
                  {...register("railwayDistance", {
                    required: "This is required",
                  })}
                />
                {errors.railwayDistance && (
                  <div className="invalid-feedback">
                    {errors.railwayDistance.message}
                  </div>
                )}
                <div className="input-group-append">
                  <span className={` ${styles.textfield} input-group-text`} id="basic-addon2">
                    KM
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="phone" className="form-label">
                Nearest Bus Station
              </label>
              <div className="input-group">
                <input
                  id="busDistance"
                  name="busDistance"
                  type="number"
                  className={classNames(` ${styles.textfield} form-control`, {
                    "is-invalid": errors.busDistance,
                  })}
                  aria-describedby="basic-addon3"
                  {...register("busDistance", {
                    required: "This is required",
                  })}
                />
                {errors.busDistance && (
                  <div className="invalid-feedback">
                    {errors.busDistance.message}
                  </div>
                )}
                <div className="input-group-append">
                  <span className={` ${styles.textfield} input-group-text`} id="basic-addon3">
                    KM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className={`${styles.features} row border p-4 my-4 mx-2 `}>
          <legend>Popular Destinations</legend>
          {fields.map((field, index) => (
            <div key={index} className=" mb-2">
              <div className="form-group">
                <input
                  id={`popularDestinations.${index}.head`}
                  key={field.id}
                  name={`popularDestinations.${index}.head`}
                  type="text"
                  className={classNames(
                    `${styles.textfield} form-control mb-4`,
                    { "is-invalid": errors.popularDestinations?.[index]?.head }
                  )}
                  placeholder={"Head " + [index + 1]}
                  {...register(`popularDestinations.${index}.head`, {
                    required: "This is required",
                  })}
                />

                {errors.popularDestinations?.[index]?.head && (
                  <div className="invalid-feedback">
                    {errors.popularDestinations?.[index]?.head.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <textarea
                  id={`popularDestinations.${index}.body`}
                  key={field.id}
                  name={`popularDestinations.${index}.body`}
                  type="text"
                  className={classNames(
                    ` ${styles.textfield} form-control mb-2`,
                    { "is-invalid": errors.popularDestinations?.[index]?.body }
                  )}
                  placeholder={"Body " + [index + 1]}
                  {...register(`popularDestinations.${index}.body`, {
                    required: "This is required",
                  })}
                />

                {errors.popularDestinations?.[index]?.body && (
                  <div className="invalid-feedback">
                    {errors.popularDestinations?.[index]?.body.message}
                  </div>
                )}
              </div>

              <div className="col-md-1">
                <button
                  type="button"
                  className="btn col "
                  onClick={() => remove(index)}
                >
                  {" "}
                  <MdDelete color="tomato" size={40} />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn  col-md-2 "
            onClick={() => append({ head: "", body: "" })}
          >
         <MdAddBox color="blue" size={50}/>
          </button>
        </fieldset>
        <fieldset className={`${styles.features} row border p-4 my-4 mx-2 `}>
          <legend>Upload Images</legend>
        <div className="form-group ">
          <input
            type="file"
            multiple={true}
            onChange={(e) => setImages(e.target.files)}
            className={classNames(" row mb-5 mt-4 mx-2", { "is-invalid": errors.images })}
            name="images"
            {...register("images", {
              required: "This is required",
              validate: (value) => {
                const fileTypes = ["image/jpg", "image/jpeg", "image/png"];
                const fileTypes2 = ["jpg", "jpeg", "png"];

              
               
               {
                
                let validimage =true
                Array.prototype.forEach.call(value, (el) => {
                    const fileType = el.type;
                    if (!fileTypes.includes(fileType)) {
                     validimage=false
                    }
                  });
                  if(!validimage){
                    return `Please upload a image of format ${fileTypes2}`
                  }
                }
                 
                

               
              },
            })}
          />
          {errors.images && (
            <div className="invalid-feedback">{errors.images.message}</div>
          )}
        </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Step3;
