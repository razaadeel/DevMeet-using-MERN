import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../store/action/profileAction'

export class ProfileGithub extends Component {

    componentDidMount({ getGithubRepos, username } = this.props) {
        getGithubRepos(username);
    }

    render() {
        const { repos, fetchingRepos } = this.props;
        return (
            <div className='profile-github'>
                <h2 className='text-primary my-1'>Github Repos</h2>
                {
                    fetchingRepos ?
                        <Spinner />
                        :
                        repos.map(repo => (
                            <div key={repo.id} className='repo bh-white p-1 my-1' style={{ backgroundColor: '#F6F2F2' }}>
                                <div>
                                    <h4>
                                        <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                                            {repo.name}
                                        </a>
                                    </h4>
                                    <p>{repo.description}</p>
                                </div>
                                <div>
                                    <ul>
                                        <li className='badge badge-primary'>
                                            Stars: {repo.stargazers_count}
                                        </li>
                                        <li className='badge badge-dark'>
                                            Watchers: {repo.watchers_count}
                                        </li>
                                        <li className='badge badge-light'>
                                            Forks: {repo.forks_count}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    repos: state.profile.repos,
    fetchingRepos: state.profile.fetchingRepos
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
