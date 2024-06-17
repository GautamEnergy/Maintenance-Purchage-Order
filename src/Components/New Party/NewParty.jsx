import React, { useState } from 'react';
import axios from 'axios';
import '../New Party/new.css'

const NewParty = () => {
    const [GST, SetGST] = useState('');
    const [PAN, SetPAN] = useState('')

    /**         ---For Gst  to get the data         */
    const onGSTHandler = (e) => {
        SetGST(e.target.value)
    }
    /** Gst to get the Pan Number & Call the Api for it  */
    // const GetPANNumberByGST = async () => {
    //     const { data } = await axios.get(`http://localhost:9001/verify-gst/${GST}`)
    //     console.log(data)
    // }


    const handleSave = (e) => {
        e.preventDefault();
        console.log('Form data submitted:');
    };

    return (
        <form
            // onSubmit={handleSave} 
            className="first-mainCard mt-5">
            <h4 className="text-center" >Add New Party</h4>
            <div className="form-group">
                <label>GST No.</label>
                <input type="text" className="form-text" name="gstNo" value={GST} onChange={onGSTHandler} />
            </div>


            <div className="form-group">
                <label>Party Name</label>
                <input type="text" className="form-text" name="partyName"
                />
            </div>

            <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-text" name="address" />
            </div>

            <div className="form-group">
                <label>Country</label>
                <input type="text" className="form-text" name="country" />
            </div>

            <div className="form-group">
                <label>State</label>
                <input type="text" className="form-text" name="state" />
            </div>

            <div className="form-group">
                <label>Pin</label>
                <input type="text" className="form-text" name="pin" />
            </div>

            <div className="form-group">
                <label>Mobile No.</label>
                <input type="text" className="form-text" name="mobileNo" />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-text" name="email" />
            </div>

            <div className="form-group">
                <label>PAN No.</label>
                <input type="text"
                    className="form-text" name="panNo"
                // value={PAN}
                //  onClick={GetPANNumberByGST}
                />
            </div>


            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    );
};

export default NewParty;