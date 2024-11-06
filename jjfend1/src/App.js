import './App.css';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './Home';
import Entry from './cmp/Entry';
import BeaTasker from './cmp/BeaTasker'
import Userhome from './Userhome';
import ConfirmationPage from './cmp/ConfirmationPage';
import Searchresults from './cmp/searchresult';
import BookingForm from './cmp/BookingForm';
import UserProfile from './cmp/userProfile';
import TaskerProfile from './cmp/taskerProfile';
import UserCancel from './cmp/usercancel';
import TaskerCancel from './cmp/taskercancel';
import CouponBooking from './cmp/CouponBooking';
import UserReviewForm from './cmp/userReview';
import TaskerIncompReasonForm from './cmp/TaskerIncompletedreason'
import UserIncompReasonForm from './cmp/userIncompletedreason'
import DiscountCoupon from './cmp/DiscountCoupon';
import Pendingwork from './cmp/pendingwork';
import UserCompletedwork from './cmp/completedwork';
import UserInCompletedwork from './cmp/UserIncompleted';
import IncomingRequest from './cmp/incomingrequest';
import TaskerPendingWork from './cmp/taskerpendingwork';
import TaskerCompletedWork from './cmp/TaskerCompletedwork';
import TaskerInCompletedWork from './cmp/TaskerIncompleted';


import ProtectedRoute from './Authencation/1ProtectedRoute';



 function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={
          
          <Home />
          }></Route>
         
        <Route path="/Userhome" element={
        
        <ProtectedRoute element={<Userhome/>

        }/>}>

        </Route>
        <Route path="/Entry" element={<Entry />}></Route>
       
        <Route path="/BeaTasker" element={
          <ProtectedRoute element={<BeaTasker />
          
          }/>}>

          </Route>
        <Route path="/Confirmation" element={
          <ProtectedRoute element={<ConfirmationPage />

          }/>}>
            
          </Route>
        <Route path="/searchedresults" element={
          <ProtectedRoute element={
          <Searchresults />
      }/>}>
            


      </Route>
        <Route path='/bookingform' element={
          <ProtectedRoute element={
          <BookingForm />
      }/>}>
            


      </Route>
        <Route path='/userprofile' element={
        <ProtectedRoute element={
        <UserProfile />
      }/>}>
            


      </Route>
        <Route path='/taskerprofile' element={
        <ProtectedRoute element={
        <TaskerProfile />
      }/>}>
            


      </Route>
        <Route path='/usercancel' element={
        <ProtectedRoute element={
        <UserCancel />
      }/>}>
            


      </Route>
        <Route path='/taskercancel' element={
        <ProtectedRoute element={
        <TaskerCancel />
      }/>}>
            


      </Route>
        <Route path='/couponbooking' element={
        <ProtectedRoute element={
        <CouponBooking />
      }/>}>
            


      </Route>
        <Route path='/userreviewform' element={
        <ProtectedRoute element={
        <UserReviewForm />
      }/>}>
            


      </Route>
        <Route path='/taskerincompreviewform' element={
        <ProtectedRoute element={
        <TaskerIncompReasonForm />
      }/>}>
            


      </Route>
        <Route path='/userincompreviewform' element={
        <ProtectedRoute element={
        <UserIncompReasonForm />
      }/>}>
            


      </Route>
        <Route path='/discountcoupon' element={
        <ProtectedRoute element={
        <DiscountCoupon />
      }/>}>
            


      </Route>
        <Route path='/userpending' element={
        <ProtectedRoute element={
        <Pendingwork />
      }/>}>
            


      </Route>
        <Route path='/usercompleted' element={
        <ProtectedRoute element={
        <UserCompletedwork />
      }/>}>
            


      </Route>
        <Route path='/userincompleted' element={
        <ProtectedRoute element={
        <UserInCompletedwork />
      }/>}>
            


      </Route>
        <Route path='/incomingrequest' element={
        <ProtectedRoute element={
        <IncomingRequest />
      }/>}>
            


      </Route>
        <Route path='/taskerpending' element={
        <ProtectedRoute element={
        <TaskerPendingWork />
      }/>}>
            


      </Route>
        <Route path='/taskercompleted' element={
        <ProtectedRoute element={
        <TaskerCompletedWork />
      }/>}>
            


      </Route>
        <Route path='/taskerincompleted' element={
        <ProtectedRoute element={
        <TaskerInCompletedWork />
      }/>}>
            


      </Route>
        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
