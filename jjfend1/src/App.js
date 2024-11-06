import './App.css';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './Home';
import Entry from './cmp/user/Entry';
import BeaTasker from './cmp/worker/BeaTasker'
import Userhome from './cmp/user/Userhome';
import ConfirmationPage from './cmp/ConfirmationPage';
import Searchresults from './cmp/searchresult';
import BookingForm from './cmp/BookingForm';
import UserProfile from './cmp/user/userProfile';
import TaskerProfile from './cmp/worker/taskerProfile';
import UserCancel from './cmp/user/usercancel';
import TaskerCancel from './cmp/worker/taskercancel';
import CouponBooking from './cmp/CouponBooking';
import UserReviewForm from './cmp/user/userReview';
import TaskerIncompReasonForm from './cmp/worker/TaskerIncompletedreason'
import UserIncompReasonForm from './cmp/user/userIncompletedreason'
import DiscountCoupon from './cmp/DiscountCoupon';
import Pendingwork from './cmp/pendingwork';
import UserCompletedwork from './cmp/completedwork';
import UserInCompletedwork from './cmp/user/UserIncompleted';
import IncomingRequest from './cmp/incomingrequest';
import TaskerPendingWork from './cmp/worker/taskerpendingwork';
import TaskerCompletedWork from './cmp/worker/TaskerCompletedwork';
import TaskerInCompletedWork from './cmp/worker/TaskerIncompleted';


import ProtectedRoute from './Authencation/1ProtectedRoute';
 import ProtectedRouteWorker from './Authencation/1ProtectedRoute_Worker';

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
       
        <Route path="/BeaTasker" element={<BeaTasker />}></Route>
        
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
        <ProtectedRouteWorker element={
        <TaskerProfile />
      }/>}>
            


      </Route>
        <Route path='/usercancel' element={
        <ProtectedRoute element={
        <UserCancel />
      }/>}>
            


      </Route>
        <Route path='/taskercancel' element={
        <ProtectedRouteWorker element={
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
        <ProtectedRouteWorker element={
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
        <ProtectedRouteWorker element={
        <IncomingRequest />
      }/>}>
            


      </Route>
        <Route path='/taskerpending' element={
        <ProtectedRouteWorker element={
        <TaskerPendingWork />
      }/>}>
            


      </Route>
        <Route path='/taskercompleted' element={
        <ProtectedRouteWorker element={
        <TaskerCompletedWork />
      }/>}>
            


      </Route>
        <Route path='/taskerincompleted' element={
        <ProtectedRouteWorker element={
        <TaskerInCompletedWork />
      }/>}>
            


      </Route>
        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
