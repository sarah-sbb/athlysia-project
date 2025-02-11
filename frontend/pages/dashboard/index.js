import Dashboard from '../../components/Dashboard';
import LayoutD from '../../components/LayoutD';

function Index() {

  return <Dashboard />;

}


Index.getLayout = function getLayout(page) {
  return <LayoutD>{page}</LayoutD>;
};


export default Index;
