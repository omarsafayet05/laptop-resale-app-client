import { ListGroupItem } from "flowbite-react";
import { Link } from "react-router-dom";

const BrandRoutes = ({ title }) => {
  return (
    <div>
      <div className="">
        <Link to={`/LapItems/${title}`}>
          <ListGroupItem>{`${title}`}</ListGroupItem>
        </Link>
      </div>
    </div>
  );
};

export default BrandRoutes;

{
  /* <div className="flex items-center gap-2">
<Radio id="lenovo-02" name="laptops" value="Lenovo" />
<Label htmlFor="lenovo-02">Lenovo</Label>
</div>
<div className="flex items-center gap-2">
<Radio id="dell-03" name="laptops" value="Dell" />
<Label htmlFor="dell-03">Dell</Label>
</div>
<div className="flex items-center gap-2">
<Radio id="acer-04" name="laptops" value="Acer" />
<Label htmlFor="acer-04">Acer</Label>
</div>
<div className="flex items-center gap-2">
<Radio id="asus-05" name="laptops" value="Asus" />
<Label htmlFor="asus-05">Asus</Label>
</div>
<div className="flex items-center gap-2">
<Radio id="mac-06" name="laptops" value="Mac" />
<Label htmlFor="mac-06">Mac</Label>
</div> */
}
