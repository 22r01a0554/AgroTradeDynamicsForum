import React, { useContext ,useState,useEffect,useRef} from 'react'
import sellerContext from '../context/sellers/sellerContext';
import Selleritem from "./Selleritem"
import { useNavigate } from "react-router-dom"
import styles from './AgriProductSellers.module.css'
const AgriProductSellers = (props) => {
    const context = useContext(sellerContext);
    const{sellers,getAllAgriProductSellers,editAgriProductSeller}=context;
    let navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
        getAllAgriProductSellers()
        // eslint-disable-next-line
      }
      else{
        navigate('/login')
        
      }   
      // eslint-disable-next-line 
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [categories, setCategories] = useState([]);
    const [seller, setSeller] = useState({id:"",ecategory:"",ename:"",eemail:"",emobilenumber:"",eaddress:"",efarmname:"",efarmlocation:"",etypeoffarm:"",efarmingmethods:"",esocialmedialinks:"",edesc:"",eimage:null})
    const [error, setError] = useState("");
    useEffect(() => {
      fetch('http://localhost:5000/api/seller/sellerscategories')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json();
          })
          .then(data => setCategories(data))
          .catch(error => console.error('Error fetching categories:', error));
  }, []);
  const updateAgriProductSeller=(currentSeller)=>{
      ref.current.click();
      setSeller({id:currentSeller._id,ecategory:currentSeller.category,ename:currentSeller.name,eemail:currentSeller.email,emobilenumber:currentSeller.mobilenumber,eaddress:currentSeller.address,efarmname:currentSeller.farmname,efarmlocation:currentSeller.farmlocation,etypeoffarm:currentSeller.typeoffarm,efarmingmethods:currentSeller.farmingmethods,esocialmedialinks:currentSeller.socialmedialinks,edesc:currentSeller.edesc,eimage:null});
    }
    const resizeImage = (file, width, height) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
              const img = new Image();
              img.src = event.target.result;
              img.onload = () => {
                  const canvas = document.createElement('canvas');
                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0, width, height);
                  canvas.toBlob((blob) => {
                      resolve(blob);
                  }, file.type);
              };
              img.onerror = () => {
                  reject(new Error('Image load error'));
              };
          };
          reader.onerror = () => {
              reject(new Error('File read error'));
          };
      });
  };
  const handleChange = async (e) => {
    setError(""); // Clear any previous error messages
    if (e.target.name === "eimage") {
        const file = e.target.files[0];

        // Desired dimensions
        const desiredWidth = 800;
        const desiredHeight = 800;

        try {
            const resizedImage = await resizeImage(file, desiredWidth, desiredHeight);
            setSeller({ ...seller, eimage: resizedImage }); // Update eimage property with resized image
        } catch (error) {
            console.error('Error resizing image:', error);
            setError('Error resizing image.');
        }
    } else {
        setSeller({ ...seller, [e.target.name]: e.target.value }); // Update other form fields
    }
};  const handleSubmit=(e)=>{
      console.log("Updating the seller",seller)
      e.preventDefault();
      if (!seller.eimage) {
            setError("Please upload a valid image.");
            return;
        }
      editAgriProductSeller(seller.id,seller.ecategory,seller.ename,seller.eemail,seller.emobilenumber,seller.eaddress,seller.efarmname,seller.efarmlocation,seller.etypeoffarm,seller.efarmingmethods,seller.esocialmedialinks,seller.edesc,seller.eimage)
      refClose.current.click();
      // props.showAlert("Updated  successfully","success")

    }
    
    
    return (
      <>
      <button ref={ref} type="button" className={`btn btn-primary d-none ${styles.hiddenButton}`}  data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className={`modal fade ${styles.modalFade}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className={`modal-dialog ${styles.modalDialog}`}>
            <div className={`modal-content ${styles.modalContent}`}>
              <div className={`modal-header ${styles.modalHeader}`}>
                <h5 className={`modal-title ${styles.modalTitle}`} id="exampleModalLabel">Edit Seller</h5>
                <button type="button" className={`btn-close ${styles.btnClose}`} data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className={`modal-body ${styles.modalBody}`}>
                <form className={`container my-3 ${styles.formContainer}`}>
                  <div className={`mb-3 ${styles.formGroup}`}>
          <input type="file" id="eimage" name="eimage" multiple accept="image/*" onChange={handleChange} />
          </div>          
          <div className={`mb-3 ${styles.formGroup}`}>
          <label htmlFor="ecategory" className={`form-label ${styles.formLabel}`}>Category</label>
            <select className="form-control" name="ecategory" id="ecategory" value={seller.ecategory} onChange={handleChange} required>
            <option value="">Select a category</option>
            {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>))}
            </select>
          </div>
          <div className={`mb-3 ${styles.formGroup}`}>
            <label htmlFor="ename" className={`form-label ${styles.formLabel}`}>Name</label>
            <input type="text" className={`form-control ${styles.formControl}`} id="ename" name="ename" value={seller.ename} aria-describedby="emailHelp" minLength={5} required onChange={handleChange} />
          </div>
          <div className="mb-3">
          <label htmlFor="eemail" className={`form-label ${styles.formLabel}`}>Email</label>
            <input type="email" id="eemail" name="eemail" value={seller.eemail} className={`form-control ${styles.formControl}`} minLength={5} required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="emobilenumber" className={`form-label ${styles.formLabel}`}>Mobilenumber</label>
            <input type="text" className={`form-control ${styles.formControl}`} id="emobilenumber" name="emobilenumber"value={seller.emobilenumber} aria-describedby="emailHelp"  minLength={5} required onChange={handleChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="eaddress" className={`form-label ${styles.formLabel}`}> Address</label>
          <input type="text" className={`form-control ${styles.formControl}`} id="eaddress" name="eaddress" value={seller.eaddress} aria-describedby="emailHelp" minLength={5} required onChange={handleChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="efarmname" className={`form-label ${styles.formLabel}`}> Farm Name(Optional)</label>
          <input type="text" className={`form-control ${styles.formControl}`} id="efarmname" name="efarmname" value={seller.efarmname} aria-describedby="emailHelp" minLength={5} required onChange={handleChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="efarmlocation" className={`form-label ${styles.formLabel}`}> Farm Location(Optional)</label>
          <input type="text" className={`form-control ${styles.formControl}`} id="efarmlocation" name="efarmlocation" value={seller.efarmlocation} aria-describedby="emailHelp" minLength={5} required onChange={handleChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="etypeoffarm" className={`form-label ${styles.formLabel}`}>Type Of Farm(Optional)</label>
          <input type="text" className={`form-control ${styles.formControl}`} id="etypeoffarm" name="etypeoffarm" value={seller.etypeoffarm} aria-describedby="emailHelp" minLength={5} required onChange={handleChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="efarmingmethods" className={`form-label ${styles.formLabel}`}>FarmingMethods</label>
          <input type="text" className={`form-control ${styles.formControl}`} id="efarmingmethods" name="efarmingmethods" value={seller.efarmingmethods} aria-describedby="emailHelp" minLength={5} required onChange={handleChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="esocialmedialinks" className={`form-label ${styles.formLabel}`}>Social Media Links</label>
          <input type="text" className={`form-control ${styles.formControl}`} id="esocialmedialinks" name="esocialmedialinks" value={seller.esocialmedialinks} aria-describedby="emailHelp" minLength={5} required onChange={handleChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="edesc" className={`form-label ${styles.formLabel}`}> Description About Farmer</label>
          <input type="text" className={`form-control ${styles.formControl}`} id="edesc" name="edesc" value={seller.edesc} aria-describedby="emailHelp" minLength={5} required onChange={handleChange}/>
          </div>
        </form>
        </div>
        <div className={`modal-footer ${styles.modalFooter}`}>
            <button type="button" ref={refClose}className={`btn btn-secondary ${styles.btnSecondary}`} data-bs-dismiss="modal">Close</button>
            <button disabled={seller.ename.length<5 } type="button" className={`btn btn-primary ${styles.btnPrimary}`}onClick={handleSubmit}>Update Seller</button>
          </div>
        </div>
      </div>
    </div>
    <div className={`row my-3 mx-2 ${styles.row}`}>
          <h2 className={styles.header}>Sellers</h2>
          <div className={`container ${styles.container}`}>{sellers.length === 0 && 'No sellers to display'}</div>
          {sellers.map((seller) => {
            return <Selleritem key={seller._id} updateAgriProductSeller={updateAgriProductSeller} seller={seller} />;
          })}
        </div>
      </>
    );
  };
export default AgriProductSellers
