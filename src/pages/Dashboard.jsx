import BalanceCard from "../components/Balance";
import Navbar from "../components/Navbar";
import { Users } from "../components/Users";

const Dashboard = function() {
  return (
    <div>
      <Navbar />
      <BalanceCard/>
      <Users/>
     
    </div>
  );
}

export default Dashboard;
