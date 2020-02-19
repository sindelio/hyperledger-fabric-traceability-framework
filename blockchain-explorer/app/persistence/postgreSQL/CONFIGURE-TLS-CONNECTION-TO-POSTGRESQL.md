<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TLS connection to Postgresql](#tls-connection-to-postgresql)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


<!-- (SPDX-License-Identifier: CC-BY-4.0) -->  <!-- Ensure there is a newline before, and after, this line -->

# TLS connection to Postgresql

In order to configure TLS connection to Postgresql take next steps:

- [Optional] pass environment variable `DATABASE_CERTS_PATH`, default is `/opt/explorer/db-certs`

- put certificates into folder specified by `DATABASE_CERTS_PATH`. There should be three files:

    - `client-cert.pem`
    - `client-key.pem`
    - `server-ca.pem`

- pass environment variable `DATABASE_SSL_ENABLED=true`
