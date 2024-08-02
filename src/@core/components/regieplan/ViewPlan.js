import React, { forwardRef, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Edit, Trash } from "react-feather";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import {
  Button,
  Card,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import api from "../../api/api";

const ViewPlan = ({ open, handleModal, onSelect }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const offset = 10;

  const fetchData = async (start = 0) => {
    try {
      const result = await api.get(`event/list`, {
        params: { start, per_page: offset }
      });
      setTotalPages(result.data.totalPage);
      setData(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePagination = (page) => {
    fetchData(page.selected * offset);
    setCurrentPage(page.selected);
  };

  const handleDelete = async (entry) => {
    try {
      const result = await api.delete(`event/${entry.id}`);
      toast.success("Plan deleted succesfully");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={totalPages}
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

  const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className="form-check">
      <Input type="checkbox" ref={ref} {...props} />
    </div>
  ));

  const columns = [
    {
      name: "Title",
      minWidth: "250px",
      sortable: (row) => row.title,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate">
            <span
              className="d-block fw-bold text-truncate"
              style={{ width: "200px" }}
            >
              {row.title}
            </span>
          </div>
        </div>
      )
    },
    {
      name: "Runde",
      sortable: true,
      selector: (row) => row.round
    },
    {
      name: "Gegner",
      sortable: true,
      selector: (row) => row.opponent
    },

    {
      name: "Uhrzeit",
      sortable: true,
      selector: (row) => row.startTime
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
                // setSelectedRowToEdit(row);
                // setModal(!modal);
              }}
            >
              <Edit size={15} className="text-primary" />
              <span className="align-middle ms-50 text-primary">Edit</span>
            </div>
            <div
              tag="a"
              href="/"
              className="cursor-pointer"
              onClick={() => {
                handleDelete(row);
              }}
            >
              <Trash size={15} className="text-danger" />
              <span className="align-middle ms-50 text-danger">Delete</span>
            </div>
          </div>
        );
      }
    }
  ];
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="modal-dialog-centered"
      style={{ maxWidth: "80vw" }}
      modalClassName="modal-primary modal-xl modal-centered"
    >
      <ModalHeader toggle={handleModal}></ModalHeader>
      <ModalBody>
        <Card>
          <CardHeader className="h4">View Regieplan</CardHeader>
          <div className="react-dataTable react-dataTable-selectable-rows">
            <DataTable
              noHeader
              pagination
              // selectableRows
              columns={columns}
              // paginationPerPage={offset}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              style={{ cursor: "pointer" }}
              // paginationDefaultPage={currentPage + 1}
              // selectableRowsComponent={BootstrapCheckbox}
              data={data}
              onRowClicked={(data) => {
                // setSelectedRowToView(data);
                // setViewModal(!modal);
                onSelect(data);
              }}
              // onSelectedRowsChange={(e) => {
              //   // setSelectedRowsToDelete(e.selectedRows);
              //   console.log(e);
              // }}
            />
          </div>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewPlan;
