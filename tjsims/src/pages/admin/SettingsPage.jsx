import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/admin/Navbar';
import { settingsAPI, usersAPI, authAPI } from '../../utils/api';
import { BsPlusLg, BsEye, BsEyeSlash } from 'react-icons/bs';
import '../../styles/SettingsPage.css';

const SettingsPage = () => {
  // ... (Keep all existing state and functions from line 8 to 175)

  return (
    <div className="admin-layout"> {/* CHANGED */}
      <Navbar />
      <main className="admin-main"> {/* CHANGED */}
        <div className="admin-container"> {/* CHANGED */}
          <div className="settings-grid">
            <section className="card">
              <h2>Business Information</h2>
              <p className="section-sub">Update your store details and contact information</p>
              <div className="form-group"> {/* CHANGED */}
                <label>Store Name</label>
                <input className="form-input" value={storeName} onChange={(e) => setStoreName(e.target.value)} /> {/* CHANGED */}
              </div>
              <div className="form-group"> {/* CHANGED */}
                <label>Address</label>
                <input className="form-input" value={bizAddress} onChange={(e) => setBizAddress(e.target.value)} /> {/* CHANGED */}
              </div>
              <div className="form-group"> {/* CHANGED */}
                <label>Contact Number</label>
                <input className="form-input" value={bizContact} onChange={(e) => setBizContact(e.target.value)} /> {/* CHANGED */}
              </div>
              <div className="form-group"> {/* CHANGED */}
                <label>Email</label>
                <input className="form-input" value={bizEmail} onChange={(e) => setBizEmail(e.target.value)} /> {/* CHANGED */}
              </div>
              <button className="btn btn-primary" onClick={saveBusinessInfo} disabled={savingBiz}> {/* CHANGED */}
                {savingBiz ? 'Saving...' : 'Save Business Information'}
              </button>
            </section>

            <section className="card">
              <div className="card-head">
                <h2>User Management</h2>
                {isAdmin && (
                  <button className="btn btn-outline" onClick={() => setShowAddUser(true)}> {/* CHANGED */}
                    <BsPlusLg /> Add User
                  </button>
                )}
              </div>
              <div className="table-container"> {/* ADDED WRAPPER */}
                <table className="table"> {/* CHANGED */}
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>{u.username}</td>
                        <td><span className={`badge role-${(u.role||'').toLowerCase()}`}>{u.role}</span></td>
                        <td><span className={`badge status-${(u.status||'').toLowerCase()}`}>{u.status}</span></td>
                        <td>
                          <button className="btn btn-outline" style={{height: '36px', padding: '0 12px'}} onClick={() => openEdit(u)}>Edit</button> {/* CHANGED */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="card">
              <h2>System Preferences</h2>
              <p className="section-sub">Configure payments, and shipping options</p>
              <div className="switch-row">
                <label>Cash Payment</label>
                <input type="checkbox" checked={cashEnabled} onChange={(e) => setCashEnabled(e.target.checked)} />
              </div>
              <div className="switch-row">
                <label>GCash Payment</label>
                <input type="checkbox" checked={gcashEnabled} onChange={(e) => setGcashEnabled(e.target.checked)} />
              </div>
              <div className="switch-row">
                <label>Cash On Delivery</label>
                <input type="checkbox" checked={codEnabled} onChange={(e) => setCodEnabled(e.target.checked)} />
              </div>
              <button className="btn btn-primary" onClick={savePreferences} disabled={savingPrefs}> {/* CHANGED */}
                {savingPrefs ? 'Saving...' : 'Save Preferences'}
              </button>
            </section>

            <section className="card">
              <h2>Password Management</h2>
              <p className="section-sub">Update your account password for security</p>
              <div className="form-group"> {/* CHANGED */}
                <label>Current Password</label>
                <div className="password-input">
                  <input className="form-input" type={showPwd.current ? 'text' : 'password'} placeholder="Enter your current password" value={pwd.current} onChange={(e)=>setPwd({...pwd, current: e.target.value})} /> {/* CHANGED */}
                  <button type="button" onClick={()=>setShowPwd({...showPwd, current: !showPwd.current})}>{showPwd.current ? <BsEyeSlash/> : <BsEye/>}</button>
                </div>
              </div>
              <div className="form-group"> {/* CHANGED */}
                <label>New Password</label>
                <div className="password-input">
                  <input className="form-input" type={showPwd.next ? 'text' : 'password'} placeholder="Enter your new password" value={pwd.next} onChange={(e)=>setPwd({...pwd, next: e.target.value})} /> {/* CHANGED */}
                  <button type="button" onClick={()=>setShowPwd({...showPwd, next: !showPwd.next})}>{showPwd.next ? <BsEyeSlash/> : <BsEye/>}</button>
                </div>
              </div>
              <div className="form-group"> {/* CHANGED */}
                <label>Confirm New Password</label>
                <div className="password-input">
                  <input className="form-input" type={showPwd.confirm ? 'text' : 'password'} placeholder="Confirm your new password" value={pwd.confirm} onChange={(e)=>setPwd({...pwd, confirm: e.target.value})} /> {/* CHANGED */}
                  <button type="button" onClick={()=>setShowPwd({...showPwd, confirm: !showPwd.confirm})}>{showPwd.confirm ? <BsEyeSlash/> : <BsEye/>}</button>
                </div>
              </div>
              <button className="btn btn-primary" onClick={saveNewPassword} disabled={savingPwd}> {/* CHANGED */}
                {savingPwd ? 'Saving...' : 'Save New Password'}
              </button>
            </section>
          </div>
        </div>
      </main>

      {/* ... (Modals are already consistent) ... */}
    </div>
  );
};

export default SettingsPage;