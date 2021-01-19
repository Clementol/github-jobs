import React, { useState } from 'react'
import { useFetchJobs } from '../components/fetchJobs';
import {Container} from 'react-bootstrap'
import Job from '../components/Job';
import JobsPagination from '../components/PagePagination';
import SearchForm from '../components/searchForm';



export type Jobs = {
      jobs: any[];
      loading: boolean;
      error: string;
      hasNextPage: boolean
}

const Home = () =>  { 

      const [params, setParams] = useState({});
      const [page, setPage] = useState(1)
      const  {jobs, loading, error, hasNextPage}:Jobs = useFetchJobs(params, page);
      
      console.log(params);
      const handleParamChange = (e: React.FormEvent<HTMLInputElement>) => {
            const param = e.currentTarget.name 
            const value = e.currentTarget.value 
            setPage(1);
            setParams((prev) => {
                  return {...prev, [param]: value}
            })
      }

    return (
      <Container className="mb-4">
            <h1 className="mb-4">GitHub Jobs</h1>
            <SearchForm params={params} onParamChange={handleParamChange} />
            <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
            { loading && <h1>Loading ...</h1>}
            {error && <h1>Error Try Refreshing</h1>}
            {jobs.map( job => (
                  <Job key={job.id} job={job} />
            )) }
            <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />

      </Container>
    )
  
};

export default Home;
