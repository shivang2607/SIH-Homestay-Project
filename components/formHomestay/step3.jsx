import { useFormContext,useFieldArray} from "react-hook-form"
import classNames from 'classnames'
import React, { useState } from 'react'
import places from "../../location"
import { MdDelete } from 'react-icons/md'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function Step3(props) {
    const {register,control,formState: { errors }} = useFormContext();

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "popularDestinations"// unique name for your Field Array
      });

      const [images, setImages] = useState(null)

      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
       // console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        //console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        
       props.setcity(item.City)
       props.setstate(item.State)
        
        
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
     // {console.log("hey",city)}
      const formatResult = (item) => {
          //console.log("hey", item)
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left', fontSize: '20px'}}> {item.City}, {item.State}  </span>
           
          </>
        )
      }

    return(
        
             <div className="card mb-2 mt-3"> 
      <div className="card-header" >Other Information </div>
      <div className ="card-body">
      <fieldset className="row border p-3 mt-3 mb-3 mx-2">
<legend  >Address</legend>
     <div style={{ width: 400,marginBottom:'2rem',fontSize:'20px', zIndex:"3" }}>
          <ReactSearchAutocomplete
            items={places}
            fuseOptions={{ keys: ["City","District", "State"] }}
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
            
            styling={
                  {
                      zIndex:'3',
                    fontSize:'20px'
                  }

                }
          />
        </div>
      
       <div className="form-group col-md-6">
          <label htmlFor="rent" className="mb-1">Rent</label>
          <input
          id="rent"
          name ="address"
          type='text'
          className={classNames("form-control", {"is-invalid": errors.address})}
          placeholder="Enter Address"
          {...register("address", {
            required: "This is required",
          })}
              />  
          {errors.address &&(
            <div className="invalid-feedback">{errors.address.message}</div>
          ) } 
       </div>
      </fieldset>

      <fieldset className="row border p-3 mt-3 mb-3 mx-2">
          <legend  >Popular Destinations</legend>
                {fields.map((field, index) => (   
              <div key ={index} className=" mb-2">
              <div className="form-group">
                <input
                id={`popularDestinations.${index}.head`}
              key={field.id}
                name = {`popularDestinations.${index}.head`}
                type='text'

                className={classNames("form-control mb-4 "
                , {"is-invalid": errors.popularDestinations?.[index]?.head})}

                placeholder={"Head "+[index+1]}
                {...register(`popularDestinations.${index}.head`, {
                  required: "This is required",
                })}
                    /> 
                  

                {errors.popularDestinations?.[index]?.head &&(
                  <div className="invalid-feedback">{errors.popularDestinations?.[index]?.head.message}</div>
                ) }
              </div>

        <div className="form-group">
            <textarea
                  id={`popularDestinations.${index}.body`}
                key={field.id}
                  name = {`popularDestinations.${index}.body`}
                  type='text'

                  className={classNames("form-control mb-2"
                  , {"is-invalid": errors.popularDestinations?.[index]?.body})}

                  placeholder={"Body "+[index+1]}
                  {...register(`popularDestinations.${index}.body`, {
                    required: "This is required",
                  })}
                      /> 
                

                  {errors.popularDestinations?.[index]?.body &&(
                    <div className="invalid-feedback">{errors.popularDestinations?.[index]?.body.message}</div>
                  ) }
          </div>

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
            className="btn btn-primary col-md-2 "
            onClick={() =>append({head:'', body :''})}
          >
            Add Destination
          </button>
      </fieldset>

      <div className="form-group ">
         
                  <input type="file" multiple={true} onChange={(e)=> setImages(e.target.files)} 
                   className={classNames(" mb-2"
                   , {"is-invalid": errors.images})}
                  name='images'
                  {...register('images',{
                    required: "This is required",
                    minLength:{value: 3, message: "Min 3 pics required"}
                  })}
                  />
                  {errors.images &&(
                  <div className="invalid-feedback">{errors.images.message}</div>
                   ) }
                  </div>


 

          </div></div>
           
           
    )
}

export default Step3