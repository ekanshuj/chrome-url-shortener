import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { Output } from './';

import loader from '../../assets/loader.gif';
import { BarLoader } from 'react-spinners';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Component = () => {
  const [URL, setURL] = useState();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = async (data) => {
    const { url, alias } = data;
    try {
      const options = {
        method: 'POST',
        url: import.meta.env.VITE_POST_URL,
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
        },
        data: { "url": url, "alias": alias }
      };
      const { data } = await Axios.request(options);
      setURL(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="bg-gray-500 body-font py-8 my-1">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center flex-col">
          <div className="w-[20rem] sm:w-[27rem] my-1">
            <input type="text" id="prompt" name="prompt" placeholder='Place your url' {...register("url", { required: true })} className="w-full bg-[ghostwhite] rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8" />
            {errors.url && <p className='text-red-800 text-[0.9rem] tracking-[1px] ml-1 font-medium'>This field can't be empty!</p>}
          </div>
          <div className="w-[20rem] sm:w-[27rem] my-1">
            <input type="text" id="prompt" name="prompt" placeholder='Url alias' {...register("alias")} className="w-full bg-[ghostwhite] rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8" />
          </div>
          <button type='submit' className="text-white bg-black border-0 py-1 px-4 rounded text-lg my-2 font-medium">Generate URL</button>
        </form>
      </section>
      {/* <img className='' src={loader} /> */}

      {isSubmitting && <div className='flex items-center justify-center my-3'>
        <PropagateLoader
          color="#000000"
          size={10}
        />
      </div>}
      {URL && <Output url={URL} />}
    </>
  )
}

export default Component