// ** React Imports
import { Fragment, forwardRef, useState } from "react";

// ** Add New Modal Component

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown, Edit, Trash } from "react-feather";
import ReactPaginate from "react-paginate";

// ** Reactstrap Imports
import { Card, Col, Input, Label, Row } from "reactstrap";

import data from "../../../utility/data/files";
import EditDaten from "./EditDaten";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const DatenTable = () => {
  // ** States
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);

  // ** Function to handle Modal toggle
  const handleModal = () => {
    if (modal) {
      setSelectedRowToEdit(null);
    }
    setModal(!modal)
};

  const columns = [
    {
      name: "Name",
      minWidth: "250px",
      sortable: (row) => row.fileName,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate">
            <span className="d-block fw-bold text-truncate">
              {row.fileName}
            </span>
          </div>
        </div>
      )
    },
    {
      name: "Dauer",
      sortable: true,
      selector: (row) => row.duration
    },
    {
      name: "File Type",
      sortable: true,
      selector: (row) => row.fileType
    },

    {
      name: "File size",
      sortable: true,
      selector: (row) => `Size: ${row.fileSize} mb`
    },
    {
      name: "Actions",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="d-flex w-100 ">
            <div
              tag="a"
              href="/"
              className="me-1 cursor-pointer"
              onClick={() => {
                setSelectedRowToEdit(row);
                setModal(!modal);
              }}
            >
              <Edit size={15} className="text-primary" />
              <span className="align-middle ms-50 text-primary">Edit</span>
            </div>
            <div
              tag="a"
              href="/"
              className="cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <Trash size={15} className="text-danger" />
              <span className="align-middle ms-50 text-danger">Delete</span>
            </div>
          </div>
        );
      }
    }
  ];

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.fileName.toLowerCase().startsWith(value.toLowerCase()) ||
          item.fileSize
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.fileType.toLowerCase().startsWith(value.toLowerCase()) ||
          item.duration
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase());

        const includes =
          item.fileName.toLowerCase().includes(value.toLowerCase()) ||
          item.fileSize
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.fileType.toLowerCase().includes(value.toLowerCase()) ||
          item.duration.toString().toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  return (
    <Fragment>
      <Card>
        <Row className="justify-content-between mx-0">
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="3"
            sm="12"
          >
            <Label className="me-1" for="search-input">
              Search
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className="react-dataTable react-dataTable-selectable-rows">
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={7}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            selectableRowsComponent={BootstrapCheckbox}
            data={searchValue.length ? filteredData : data}
            onSelectedRowsChange={(e) => {
              console.log(JSON.stringify(e));
            }}
          />
        </div>
      </Card>
      {selectedRowToEdit && <EditDaten
        open={modal}
        handleModal={handleModal}
        data={selectedRowToEdit}
      />}
    </Fragment>
  );
};

export default DatenTable;
