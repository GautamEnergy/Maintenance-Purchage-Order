import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';

const BillForm = ({ formData }) => {

    const { 
        GSTdata, totalAmount, narrationDiscount, setNarrationDiscount,
        percentageDiscount, setPercentageDiscount,
        remainingAmountAfterDiscount, setRemainingAmountAfterDiscount,
        discountAmmount, setDiscountAmmount,
        narrationFreight, setNarrationFreight,
        percentageFreight, setPercentageFreight,
        amountFreight, setAmountFreight,

        narrationIGST, setNarrationIGST,
        percentageIGST, setPercentageIGST,
        amountIGST, setAmountIGST,

        narrationSGST, setNarrationSGST,
        percentageSGST, setPercentageSGST,
        amountSGST, setAmountSGST,

        narrationCGST, setNarrationCGST,
        percentageCGST, setPercentageCGST,
        amountCGST, setAmountCGST,
        finalAmout, setFinalAmount,
        transportAmmount , settransportAmmount,
        data 
      } = formData;
      console.log("Amount Frieght",amountFreight)
    // const [narrationDiscount, setNarrationDiscount] = useState('');
    // const [percentageDiscount, setPercentageDiscount] = useState('');
    // const [remainingAmountAfterDiscount, setRemainingAmountAfterDiscount] = useState(totalAmount);
    // const [discountAmmount, setDiscountAmmount] = useState(0);

    // const [narrationFreight, setNarrationFreight] = useState('');
    // const [percentageFreight, setPercentageFreight] = useState('');
    // const [amountFreight, setAmountFreight] = useState('');

    // const [narrationIGST, setNarrationIGST] = useState('');
    // const [percentageIGST, setPercentageIGST] = useState('');
    // const [amountIGST, setAmountIGST] = useState('');

    // const [narrationSGST, setNarrationSGST] = useState('');
    // const [percentageSGST, setPercentageSGST] = useState('');
    // const [amountSGST, setAmountSGST] = useState('');

    // const [narrationCGST, setNarrationCGST] = useState('');
    // const [percentageCGST, setPercentageCGST] = useState('');
    // const [amountCGST, setAmountCGST] = useState('');

    // const [finalAmout, setFinalAmount] = useState('');

    // const [data, setData] = useState(true);
    console.log(discountAmmount)

    useEffect(() => {
        // setPercentageDiscount('')
        // setRemainingAmountAfterDiscount(totalAmount);
        // setDiscountAmmount('');

        // setAmountFreight('');

        setAmountIGST('');

        setAmountSGST('');

        setAmountCGST('');
        setFinalAmount('');

    }, [GSTdata])
    useEffect(() => {
        const extractInteger = (str) => {
            if (!str) return ''; // Check if str is undefined or null
            const match = str.match(/\d+/);
            return match ? parseInt(match[0], 10) : '';
        };

        const gstValue = extractInteger(GSTdata);
        const gstPercentage = gstValue / 2;

        if (GSTdata && GSTdata.includes('L/GST')) {
            setPercentageIGST('');
            setPercentageSGST(gstPercentage);
            setPercentageCGST(gstPercentage);
        } else {
            setPercentageSGST('');
            setPercentageCGST('');
            setPercentageIGST(gstValue);
        }

        console.log('selected  GST Data:', GSTdata);
        console.log('selected  GST Value:', gstValue);
    }, [GSTdata, totalAmount]);

    useEffect(() => {
        const calculateFinalAmount = () => {


            const final = (Number(totalAmount) + Number(amountFreight) + Number(amountIGST) + Number(amountSGST) + Number(amountCGST)) - Number(remainingAmountAfterDiscount)
            setFinalAmount(final.toFixed(2));

            // else {
            //     const final = (Number(discountAmmount) + Number(amountFreight) + Number(amountIGST) + Number(amountSGST) + Number(amountCGST)) - Number(remainingAmountAfterDiscount);
            //     setFinalAmount(final.toFixed(2));
            // }
        };

        calculateFinalAmount();
    }, [totalAmount, amountFreight, amountIGST, amountSGST, amountCGST, remainingAmountAfterDiscount]);
    useEffect(() => {
        console.log(remainingAmountAfterDiscount);
        const amount = (totalAmount - remainingAmountAfterDiscount);
        console.log(amount)
        setDiscountAmmount(amount.toFixed(2));

    }, [remainingAmountAfterDiscount, totalAmount]);
    useEffect(() => {
        //console.log(remainingAmountAfterDiscount);
        
            const famount = (totalAmount - remainingAmountAfterDiscount) ;
            const abcd = famount +  Number(amountFreight)
            settransportAmmount(abcd.toFixed(2));

    }, [remainingAmountAfterDiscount, totalAmount,amountFreight]);



    useEffect(() => {
        if(percentageDiscount){
        const discountAmount = (totalAmount * percentageDiscount) / 100;
        setRemainingAmountAfterDiscount(discountAmount.toFixed(2));
        }else{
            setRemainingAmountAfterDiscount(remainingAmountAfterDiscount);
        }
    }, [percentageDiscount, totalAmount]);

    useEffect(() => {
   if(percentageFreight){
        let freightAmount = (Number(discountAmmount ? discountAmmount : totalAmount) / 100) * percentageFreight;
        console.log('Remaining Amount After Discount:', freightAmount);
        setAmountFreight(freightAmount.toFixed(2))/** */
        }else{
            setAmountFreight(amountFreight)/** */
        }
        console.log("hheheheh");
    
    }, [percentageFreight, discountAmmount]);

    useEffect(() => {
        if (percentageIGST) {
            const igstAmount = ((Number(transportAmmount ? transportAmmount : totalAmount) * percentageIGST) / 100);
            setAmountIGST(igstAmount.toFixed(2));
        }
    }, [percentageIGST, remainingAmountAfterDiscount, amountFreight, transportAmmount]);

    useEffect(() => {
        if (percentageSGST) {
            const sgstAmount = ((Number(transportAmmount ? transportAmmount : totalAmount) * percentageSGST) / 100);
            setAmountSGST(sgstAmount.toFixed(2));
        }
    }, [percentageSGST, remainingAmountAfterDiscount, amountFreight, transportAmmount]);

    useEffect(() => {
        if (percentageCGST) {
            const cgstAmount = ((Number(transportAmmount ? transportAmmount : totalAmount) * percentageCGST) / 100);
            setAmountCGST(cgstAmount.toFixed(2));
        }
    }, [percentageCGST, remainingAmountAfterDiscount, amountFreight, transportAmmount]);


    const handlePercentageChange = (type, value) => {
        if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
            switch (type) {
                case 'discount':
                    setPercentageDiscount(value);
                    break;
                    case 'freight':
                        setPercentageFreight(value);
                        break;
                default:
                    break;
            }
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const formData = {
    //         discount: { narration: narrationDiscount, percentage: percentageDiscount, remainingAmount: remainingAmountAfterDiscount },
    //         freight: { narration: narrationFreight, percentage: percentageFreight, amount: amountFreight },
    //         igst: { narration: narrationIGST, percentage: percentageIGST, amount: amountIGST },
    //         sgst: { narration: narrationSGST, percentage: percentageSGST, amount: amountSGST },
    //         cgst: { narration: narrationCGST, percentage: percentageCGST, amount: amountCGST },
    //     };
    //     console.log(formData);
    //     console.log('Percentage Discount:', percentageDiscount);
    //     console.log('Remaining Amount after Discount:', remainingAmountAfterDiscount);
    // };
    

    return (
        <Form  className="p-3" >
            <Table bordered >
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Bill Sundry</th>
                        <th>Narration</th>
                        <th>@ (%)</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data && (
                        <tr>
                            <td>1</td>
                            <td>Discount</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Narration"
                                    value={narrationDiscount}
                                    onChange={(e) => setNarrationDiscount(e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter %"
                                    value={percentageDiscount}
                                    onChange={(e) => {handlePercentageChange('discount', e.target.value)
                                        setRemainingAmountAfterDiscount("")
                                    }}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Discount Amount"
                                    onFocus={(e) => {e.target.value = ""
                                        setRemainingAmountAfterDiscount("");
                                        setPercentageDiscount("")
                                    }}
                                    value={remainingAmountAfterDiscount}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        
                                       // setPercentageDiscount('');
                                        setRemainingAmountAfterDiscount(e.target.value)

                                        setDiscountAmmount(totalAmount - remainingAmountAfterDiscount)
                                    }}
                                />
                            </td>
                        </tr>
                    )}
                    {data && (
                        <tr>
                            <td>2</td>
                            <td>Freight</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Narration"
                                    value={narrationFreight}
                                    onChange={(e) => setNarrationFreight(e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter %"
                                    value={percentageFreight}
                                    onChange={(e) =>{ handlePercentageChange('freight', e.target.value)
                                        setAmountFreight("")
                                    }
                                
                                }
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Frieght Ammount"
                                    onFocus={(e) =>{ e.target.value = ""
                                        setAmountFreight("")
                                        setPercentageFreight("")
                                    }}
                                    value={amountFreight}
                                    onChange={(e) =>{ setAmountFreight(e.target.value)
                                        //setPercentageFreight("")
                                    }}

                                />
                            </td>
                        </tr>
                    )}
                    {percentageIGST && (
                        <tr>
                            <td>3</td>
                            <td>IGST</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Narration"
                                    value={narrationIGST}
                                    onChange={(e) => setNarrationIGST(e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter %"
                                    value={percentageIGST}
                                    readOnly
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Amount"
                                    value={amountIGST}
                                    readOnly
                                />
                            </td>
                        </tr>
                    )}
                    {percentageSGST && (
                        <tr>
                            <td>4</td>
                            <td>SGST</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Narration"
                                    value={narrationSGST}
                                    onChange={(e) => setNarrationSGST(e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter %"
                                    value={percentageSGST}
                                    readOnly
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Amount"
                                    value={amountSGST}
                                    readOnly
                                />
                            </td>
                        </tr>
                    )}
                    {percentageCGST && (
                        <tr>
                            <td>5</td>
                            <td>CGST</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Narration"
                                    value={narrationCGST}
                                    onChange={(e) => setNarrationCGST(e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter %"
                                    value={percentageCGST}
                                    readOnly
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Amount"
                                    value={amountCGST}
                                    readOnly
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" className="text-right"><strong>Total Amount</strong></td>
                        <td><strong>{finalAmout}</strong></td>
                        <td></td>
                    </tr>
                </tfoot>
            </Table>
        </Form>
        
    );
};

export default BillForm;


