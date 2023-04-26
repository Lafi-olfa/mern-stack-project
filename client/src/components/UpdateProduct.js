import React, {  useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import {  getAllProducts } from '../redux/action';
import { editUser } from '../redux/action';


const UpdateProduct = ({ updateProd }) => {
 

   



    //state
    const [title, setTitle] = useState(updateProd.title);
    const [price, setPrice] = useState(updateProd.price);
    const [category, setCategory] = useState(updateProd.category);
    const [promo, setPromo] = useState(updateProd.promo);
    const [image, setImage] = useState(updateProd.image);
    const [description, setDescription] = useState(updateProd.description)

  
  
  
    //handel upload
    const fileSelectedHandler = async (e) => {
        const file = e.target.files[0]
        const fd = new FormData()
        fd.append('image', file)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('/upload/up', fd, config)
            setImage(data)
        } catch (error) {
            console.log(error)
            
        }
    }
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('image', setImage(image))


        const editedProd = { _id: updateProd._id, title, price, category, promo, image,description };
        dispatch(editUser(editedProd));
        dispatch(getAllProducts());
        closeModal();
    };

 
 

    // modal
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);

   
    function closeModal() {
        setIsOpen(false);
    }

    Modal.setAppElement('#root');
    return (
        <div >
            {/* <Button variant="primary" onClick={openModal} >UPDATE</Button> */}
         


            <Modal className="form_update" 
           
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Form onSubmit={handleSubmit} id="form_update_product"   >
          <h2 className='adding-product' >UPDATE</h2>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{width:"200px", color:'black', fontSize:'14px',fontWeight:"bold"}}>Product name: </Form.Label>
                        <Form.Control style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='product name' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{width:"200px", color:'black', fontSize:'15px',fontWeight:"bold"}}>Price:</Form.Label>


                        <Form.Control style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{width:"200px", color:'black', fontSize:'15px',fontWeight:"bold"}}>Category:</Form.Label>


                        <Form.Control style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{width:"200px", color:'black', fontSize:'15px',fontWeight:"bold"}}>Promotion:</Form.Label>

                        <Form.Control  style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='Quantity' value={promo} onChange={(e) => setPromo(e.target.value)} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label  style={{width:"200px", color:'black', fontSize:'15px',fontWeight:"bold"}}>Description:</Form.Label>

                        <Form.Control  style={{width:"200px", marginLeft:"100px"}} type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>


                    {/* uploadfile */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{width:"200px", color:'black', fontSize:'15px',fontWeight:"bold"}}> Image:</Form.Label>


                        <Form.Control style={{width:"400px", marginLeft:"50px",}} type="file" onChange={fileSelectedHandler} />
                    </Form.Group>

                    <div className='btn-add' style={{marginLeft:'50px'}} >
                    <div id='cancel'><Button variant="secondary" onClick={() => closeModal()}><i class="fa-solid fa-ban"></i> Cancel </Button></div>
            <div id='add'><button  class="btn btn-success" type="submit" ><i class="fa-solid fa-plus"></i> Add</button></div>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default UpdateProduct