import {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from "react";

import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Edit,
  Filter,
  Image,
  Music,
  Search,
  Trash,
  Video
} from "react-feather";
import ReactPaginate from "react-paginate";
import {
  Button,
  Card,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  UncontrolledButtonDropdown
} from "reactstrap";

import toast from "react-hot-toast";
import api from "../../api/api";
import DeleteDaten from "./DeleteDaten";
import EditDaten from "./EditDaten";
import ViewDaten from "./ViewDaten";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const DatenTable = forwardRef((props, ref) => {
  // ** States
  const [modal, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
  const [selectedRowToView, setSelectedRowToView] = useState(null);
  const [selectedRowToDelete, setSelectedRowToDelete] = useState(null);
  const [selectedRowsToDelete, setSelectedRowsToDelete] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const offset = 10;

  const fetchData = async (
    start = 0,
    end = offset,
    per_page = offset,
    searchText = "",
    filterType = ""
  ) => {
    const result = await api.post("file/lists", {
      start,
      end,
      per_page,
      orderby: "file_name",
      filter: "DESC",
      search: { field: { title: searchText, file_type: filterType } }
    });
    setTotalPages(result.data.totalPage);
    setData(result.data.data);
  };

  useImperativeHandle(ref, () => ({
    updateData() {
      fetchData();
    }
  }));

  useEffect(() => {
    fetchData();
  }, []);

  const deleteDaten = async () => {
    const ids = selectedRowsToDelete.map((item) => item.id);

    try {
      const result = await api.delete(`file/${ids.join(",")}`);
      toast.success("File(s) deleted successfully.", { className: "py-2" });
      fetchData();
      selectedRowsToDelete([]);
    } catch (error) {
      console.log(error);
      selectedRowsToDelete([]);
    }
  };

  const handleModal = () => {
    if (modal) {
      setSelectedRowToEdit(null);
      fetchData();
    }
    setModal(!modal);
  };

  const handleViewModal = () => {
    setViewModal(!viewModal);
  };

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const columns = [
    {
      name: "Name",
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
      name: "Dauer",
      sortable: true,
      selector: (row) => row.file_duration
    },
    {
      name: "File Type",
      sortable: true,
      selector: (row) => row.file_type
    },

    {
      name: "File size",
      sortable: true,
      selector: (row) => `Size: ${row.file_size}`
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
              onClick={(e) => {
                setSelectedRowToDelete(row);
                setDeleteModal(!deleteModal);
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

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    fetchData(page.selected * offset, offset);
    setCurrentPage(page.selected);
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

  return (
    <Fragment>
      <Card>
        <Row className="justify-content-between align-items-center mx-0 mb-2">
          <Col md="4" sm="12">
            <CardTitle className="mb-0">Files</CardTitle>
          </Col>
          {selectedRowsToDelete.length > 0 && (
            <Col
              md="4"
              sm="12"
              className="d-flex justify-content-end align-items-center mt-1"
            >
              <Button
                color="danger"
                outline
                onClick={() => {
                  deleteDaten();
                }}
              >
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </Button>
            </Col>
          )}
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="4"
            sm="12"
          >
            <InputGroup>
              <InputGroupText>
                <Search size={15} />
              </InputGroupText>
              <Input
                className="dataTable-filter"
                type="search"
                id="search-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchData(0, offset, offset, e.target.value);
                  }
                }}
              />
              <UncontrolledButtonDropdown>
                <DropdownToggle color="secondary" caret outline>
                  <Filter size={15} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="w-100"
                    onClick={(e) => {
                      fetchData(0, offset, offset, "", "image");
                    }}
                  >
                    <Image size={15} />
                    <span className="align-middle ms-50">Image</span>
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={(e) => {
                      fetchData(0, offset, offset, "", "video");
                    }}
                  >
                    <Video size={15} />
                    <span className="align-middle ms-50">Video</span>
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    <Music size={15} />
                    <span
                      className="align-middle ms-50"
                      onClick={(e) => {
                        fetchData(0, offset, offset, "", "audio");
                      }}
                    >
                      Audio
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </InputGroup>
          </Col>
        </Row>
        <div className="react-dataTable react-dataTable-selectable-rows">
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={offset}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            selectableRowsComponent={BootstrapCheckbox}
            data={data}
            onRowClicked={(data) => {
              setSelectedRowToView(data);
              setViewModal(!modal);
            }}
            onSelectedRowsChange={(e) => {
              setSelectedRowsToDelete(e.selectedRows);
              console.log(e);
            }}
          />
        </div>
      </Card>
      {selectedRowToEdit && (
        <EditDaten
          open={modal}
          handleModal={handleModal}
          data={selectedRowToEdit}
        />
      )}
      {selectedRowToDelete && (
        <DeleteDaten
          open={deleteModal}
          handleModal={handleDeleteModal}
          onDelete={() => {
            fetchData();
            handleDeleteModal();
          }}
          data={selectedRowToDelete}
        />
      )}
      {selectedRowToView && (
        <ViewDaten
          open={viewModal}
          handleModal={handleViewModal}
          data={selectedRowToView}
        />
      )}
    </Fragment>
  );
});

export default DatenTable;
