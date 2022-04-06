import React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { data } from "./garbage_data";
import FilterBar from "./Searchbar";
import Cardview from "./Cardview";
import Pagetop from "../Homepage/Pagetop";
import SimpleAccordion from "./Sidebar";

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function Tournament() {
  const [allData, setData] = useState(data);
  const [filters, setFilter] = useState({
    size: "",
    coordinator: "",
    location: "",
    before:"",
    after:"",
  });
  const generatesizeDataForDropdown = () => {
    return [...new Set(data.map((item) => item.size))];
  };

  const handleFilterName = (name) => {
    const filteredData = allData.filter((item) => {
      const fullName = `${item.name} ${item.coordinator}`;
      if (fullName.toLowerCase().includes(name.toLowerCase())) {
        return item;
      }
    });

    setData(filteredData);
  };

  const handleFilterLocation = (location) => {
    let Sfilter = { ...filters };
    Sfilter["location"] = location;
    setFilter(Sfilter);
    const filteredData = data.filter((item) => {
      if (item.location.toLowerCase().includes(filters["location"].toLowerCase()) && item.size == filters["size"]) {
        return item;
      }
    });

    setData(filteredData);
  };

  const handleFilterSize = (size) => {
    let Sfilter = { ...filters };
    Sfilter["size"] = size;
    setFilter(Sfilter);
    const filteredData = data.filter((item) => {
      if (filters) {
        setData
        return item;
      }
    });

    setData(filteredData);
  };

  const handleFilterDate = (date, field) => {
    const filteredData = allData.filter((item) => {
      if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
        return item;
      }
    });

    setData(filteredData);
  };
  return (
    <React.Fragment>
      <Pagetop></Pagetop>
 
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
        <SimpleAccordion>
          
        </SimpleAccordion>
        </div>
        <div className="col-sm-9">
          <div className="row mt-5">
            {allData.map((item) => (
              <Cardview items={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default Tournament;
