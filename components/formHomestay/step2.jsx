import { useFormContext,useFieldArray} from "react-hook-form"
import classNames from 'classnames'
import { Switch,FormControl,FormLabel } from '@chakra-ui/react'
// import  TimePicker  from "react-time-picker"
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'




function Step2(params) {
  const {register,control,formState: { errors }} = useFormContext();

  const [Time1, setTime1] = useState('12:00');
  const [Time2, setTime2] = useState('12:00');
  
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "rules"// unique name for your Field Array
  });

    return(
      <div style={{borderRadius:"10px"}} className="card mb-5 mt-3 shadow"> 
      <div className="card-header" >Personal Information</div>
      <div className ="card-body">
        
   <div className="row">

      <div className="form-group col">
          <label htmlFor="homestayName" className="mb-1">Homestay Name</label>
          <input
          id="homestayName"
          name ="homestayName"
          type='text'
          className={classNames("form-control", {"is-invalid": errors.homestayName})}
          placeholder="Homestay Name"
          {...register("homestayName", {
            required: "This is required",
          })}
              />  
          {errors.homestayName &&(
            <div className="invalid-feedback">{errors.homestayName.message}</div>
          ) } 
       </div>

       <div className="form-group col">
          <label htmlFor="maxAccomodation" className="mb-1">Max Accomodation</label>
          <input
          id="maxAccomodation"
          name ="maxAccomodation"
          type='number'
          className={classNames("form-control", {"is-invalid": errors.maxAccomodation})}
          placeholder="Max Accomodation"
          {...register("maxAccomodation", {
            required: "This is required",
          })}
              />  
          {errors.maxAccomodation &&(
            <div className="invalid-feedback">{errors.maxAccomodation.message}</div>
          ) } 
       </div>
       </div>

<div className="row">
       <div className="form-group col-md-6">
          <label htmlFor="rent" className="mb-1">Rent</label>
          <input
          id="rent"
          name ="rent"
          type='number'
          className={classNames("form-control", {"is-invalid": errors.rent})}
          placeholder="Rent per Person"
          {...register("rent", {
            required: "This is required",
          })}
              />  
          {errors.rent &&(
            <div className="invalid-feedback">{errors.rent.message}</div>
          ) } 
       </div>


      
       <h3 className="col-md-1 mt-4 ">From</h3>
      

       <div className="form-group col-md-1 mt-4  ">
          <input
            type="time"
            name="opTime1"
            {...register("opTime1",
           { required : "true",
         
          } )}
            onChange={(e)=>{setTime1(e.target.value); console.log(Time1)}} value={Time1}

                      /> 
            
       </div>
 
      <h3 className="col-md-1 mt-4 ">to</h3>


      <div className="form-group col-md-1 mt-4 ">
            <input
            type="time"
            name="opTime2"
            {...register("opTime2", {
              required : "true",
            })}
            onChange={(e)=>{setTime2(e.target.value); console.log(Time2)}} value={Time2}

                      /> 
                      
            </div>
      </div>

    <div className="form-group col mt-3 mb-3">
          {/* <label htmlFor="descript" className="mb-1">Description</label> */}
          <textarea
          id="descript"
          name ="descript"
          type='text'
          className={classNames("form-control", {"is-invalid": errors.descript})}
          placeholder="Desc"
          {...register("descript", {
            required: "This is required",
          })}
              />  
          {errors.descript &&(
            <div className="invalid-feedback">{errors.descript.message}</div>
          ) } 
       </div>

    <fieldset className="row border p-3 mt-3 mb-3 mx-2">
  <legend>Features</legend>

<div className="row mb-2">
<FormControl display='flex'  className="col mr-2">
  <Switch id="tolerrenceNonveg" name="tolerrenceNonveg" {...register("tolerrenceNonveg")}/>
  <FormLabel htmlFor="tolerrenceNonveg" mb='0'>
   Non-veg Tolerrence
  </FormLabel>
  </FormControl>

  <FormControl display='flex'  className="col ">
  <Switch id="nonVeg" name="nonVeg" {...register("nonVeg")}/>
  <FormLabel htmlFor="nonVeg" mb='0'>
   Non-veg 
  </FormLabel>
  </FormControl>

<FormControl display='flex'  className="col ">
  <Switch id="pet" name="pet" {...register("pet")}/>
  <FormLabel htmlFor="pet" mb='0'>
  Pets Allowed 
  </FormLabel>
  </FormControl>
  </div>

  <div className="row">
<FormControl display='flex'  className="col ">
  <Switch id="couple" name="couple" {...register("couple")}/>
  <FormLabel htmlFor="couple" mb='0'>
  Couple friendly 
  </FormLabel>
</FormControl>

<FormControl display='flex' className="col ">
  <Switch id="alcohol" name="alcohol" {...register("alcohol")}/>
  <FormLabel htmlFor="alcohol" mb='0'>
   Alcohol Tolerrence
  </FormLabel>
  </FormControl>

  <FormControl display='flex' className="col">
  <Switch id="ac" name="ac" {...register("ac")}/>
  <FormLabel htmlFor="ac" mb='0'>
   Air Conditioner
  </FormLabel>
  </FormControl>
  </div>

  

       </fieldset>


  {fields.map((field, index) => (   
    <div key={index} className="form-group row mb-2">
      
<div className="col-md-11">
      <input
      id={`rules.${index}`}
     key={field.id}
      name = {`rules.${index}`}
      type='text'
      className={classNames("form-control my-2"
      , {"is-invalid": errors.rules?.[index]})}

      placeholder={"Rule "+[index+1]}
      {...register(`rules.${index}`, {
        required: "This is required",
      })}
          /> 
          </div> 
      {errors.rules?.[index] &&(
        <div className="invalid-feedback">{errors.rules?.[index]?.message}</div>
      ) }

<div className="col-md-1">
      <button
   type="button"
   className="btn col "
   onClick={() =>remove(index)}
 > <MdDelete color="tomato" size={40}/></button>
 </div>

    </div>
))}

<button
   type="button"
   className="btn btn-primary"
   onClick={() =>append(null)}
 >
  Add Rule
 </button>



</div>
</div>
    )
}

export default Step2