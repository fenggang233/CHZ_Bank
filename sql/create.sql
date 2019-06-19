/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019/6/19 15:01:38                           */
/*==============================================================*/


drop table if exists Relationship_11;

drop table if exists check_account;

drop table if exists check_client_branch;

drop table if exists client;

drop table if exists client_staff;

drop table if exists fund;

drop table if exists loan;

drop table if exists save_client_branch;

drop table if exists saving_account;

drop table if exists staff;

drop table if exists sub_branch;

/*==============================================================*/
/* Table: Relationship_11                                       */
/*==============================================================*/
create table Relationship_11
(
   ID                   varchar(18) not null,
   loan_number          varchar(30) not null,
   primary key (ID, loan_number)
);

/*==============================================================*/
/* Table: check_account                                         */
/*==============================================================*/
create table check_account
(
   accountID            varchar(20) not null,
   branch_name          varchar(40),
   ID                   varchar(18),
   overdraft_limit      numeric(8,2),
   balance              numeric(8,2) not null,
   openday              date not null,
   lastday              date not null,
   primary key (accountID)
);

/*==============================================================*/
/* Table: check_client_branch                                   */
/*==============================================================*/
create table check_client_branch
(
   branch_name          varchar(40) not null,
   ID                   varchar(18) not null,
   accountID            varchar(20),
   primary key (branch_name, ID)
);

/*==============================================================*/
/* Table: client                                                */
/*==============================================================*/
create table client
(
   ID                   varchar(18) not null,
   linkman_name         varchar(20) not null,
   linkman_tel          varchar(11) not null,
   linkman_Email        varchar(40) not null,
   linkman_relationship varchar(20) not null,
   TELnumber            varchar(11) not null,
   name                 varchar(20) not null,
   address              varchar(40) not null,
   primary key (ID)
);

/*==============================================================*/
/* Table: client_staff                                          */
/*==============================================================*/
create table client_staff
(
   ID                   varchar(18) not null,
   sta_ID               varchar(18) not null,
   loan_staff           smallint not null,
   account_staff        smallint not null,
   primary key (ID, sta_ID)
);

/*==============================================================*/
/* Table: fund                                                  */
/*==============================================================*/
create table fund
(
   loan_number          varchar(30) not null,
   fund_number          int not null,
   fund_money           numeric(8,2) not null,
   fund_date            date not null,
   primary key (loan_number, fund_number)
);

/*==============================================================*/
/* Table: loan                                                  */
/*==============================================================*/
create table loan
(
   loan_number          varchar(30) not null,
   branch_name          varchar(40),
   loan_money           numeric(8,2) not null,
   release_count        int not null,
   primary key (loan_number)
);

/*==============================================================*/
/* Table: save_client_branch                                    */
/*==============================================================*/
create table save_client_branch
(
   ID                   varchar(18) not null,
   branch_name          varchar(40) not null,
   accountID            varchar(20),
   primary key (ID, branch_name)
);

/*==============================================================*/
/* Table: saving_account                                        */
/*==============================================================*/
create table saving_account
(
   accountID            varchar(20) not null,
   ID                   varchar(18),
   branch_name          varchar(40),
   rate                 double,
   currency_type        varchar(20),
   balance              numeric(8,2) not null,
   openday              date not null,
   lastday              date not null,
   primary key (accountID)
);

/*==============================================================*/
/* Table: staff                                                 */
/*==============================================================*/
create table staff
(
   ID                   varchar(18) not null,
   branch_name          varchar(40) not null,
   TELnumber            varchar(11) not null,
   name                 varchar(20) not null,
   address              varchar(40) not null,
   begindate            date not null,
   manager              smallint not null,
   managerID            varchar(18) not null,
   primary key (ID)
);

/*==============================================================*/
/* Table: sub_branch                                            */
/*==============================================================*/
create table sub_branch
(
   branch_name          varchar(40) not null,
   city                 varchar(20) not null,
   asset                numeric(8,2) not null,
   primary key (branch_name)
);

alter table Relationship_11 add constraint FK_Relationship_13 foreign key (ID)
      references client (ID) on delete restrict on update restrict;

alter table Relationship_11 add constraint FK_Relationship_14 foreign key (loan_number)
      references loan (loan_number) on delete restrict on update restrict;

alter table check_account add constraint FK_Relationship_11 foreign key (branch_name, ID)
      references check_client_branch (branch_name, ID) on delete restrict on update restrict;

alter table check_client_branch add constraint FK_Relationship_10 foreign key (ID)
      references client (ID) on delete restrict on update restrict;

alter table check_client_branch add constraint FK_Relationship_12 foreign key (accountID)
      references check_account (accountID) on delete restrict on update restrict;

alter table check_client_branch add constraint FK_Relationship_9 foreign key (branch_name)
      references sub_branch (branch_name) on delete restrict on update restrict;

alter table client_staff add constraint FK_Relationship_17 foreign key (ID)
      references client (ID) on delete restrict on update restrict;

alter table client_staff add constraint FK_Relationship_18 foreign key (sta_ID)
      references staff (ID) on delete restrict on update restrict;

alter table fund add constraint FK_Relationship_15 foreign key (loan_number)
      references loan (loan_number) on delete restrict on update restrict;

alter table loan add constraint FK_Relationship_16 foreign key (branch_name)
      references sub_branch (branch_name) on delete restrict on update restrict;

alter table save_client_branch add constraint FK_Relationship_5 foreign key (ID)
      references client (ID) on delete restrict on update restrict;

alter table save_client_branch add constraint FK_Relationship_6 foreign key (branch_name)
      references sub_branch (branch_name) on delete restrict on update restrict;

alter table save_client_branch add constraint FK_Relationship_8 foreign key (accountID)
      references saving_account (accountID) on delete restrict on update restrict;

alter table saving_account add constraint FK_Relationship_7 foreign key (ID, branch_name)
      references save_client_branch (ID, branch_name) on delete restrict on update restrict;

alter table staff add constraint FK_Relationship_3 foreign key (branch_name)
      references sub_branch (branch_name) on delete restrict on update restrict;

